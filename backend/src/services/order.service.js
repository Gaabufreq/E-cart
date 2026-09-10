import crypto from 'crypto'
import {razorpayInstance} from '../config/razorpay.js'
import {AppError}from '../utils/AppError.js'




export class OrderService {
    constructor(orderRepository,cartRepository,productRepository){
        this.orderRepository = orderRepository
        this.cartRepository = cartRepository
        this.productRepository = productRepository
    }
    async createCheckoutOrder(userId, shippingAddress){
        const cart = await this.cartRepository.findByUserId(userId);
        if(!cart || cart.items.length === 0){
            throw new AppError("Cart is empty", 400)
        }
        // Verify stock availability for all items
        for(const item of cart.items){
            const product = await this.productRepository.findById(item.product?._id || item.product);
            if(!product || product.stock < item.quantity) {
                throw new AppError(`Insufficient stock for product: ${product?.title || "Unknown"}`, 400)
            }
        }

        // Create Razorpay Order (Amount in paise)
        const options = {
            amount: Math.round(cart.totalPrice * 100),
            currency: "INR",
            receipt:`receipt_${Date.now()}`
        };

        let razorpayOrder;
        try {
            razorpayOrder = await razorpayInstance.orders.create(options);
        } catch (error) {
            throw new AppError(`Razorpay Order Creation Failed: ${error.message || "Invalid API keys"}`, 500);
        }

        const orderItems = cart.items.map((item) => ({
            product:item.product?._id || item.product,
            title: item.product?.title || "Product",
            quantity:item.quantity,
            price:item.price,
        }));

        const newOrder = await this.orderRepository.create({
            user: userId,
            items:orderItems,
            totalAmount:cart.totalPrice,
            shippingAddress,
            razorpayOrderId:razorpayOrder.id,
            status:"pending",
        });

        return {
            order: newOrder,
            razorpayOrder
        };

    }

    async verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature){
        const order = await this.orderRepository.findByRazorpayOrderId(razorpayOrderId);
        if(!order){
            throw new AppError("Order not found", 404)
        }

        // Generated Signature Verification using SHA256 HMAC

        const body = razorpayOrderId + "|" + razorpayPaymentId;
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex");

        if(expectedSignature !== razorpaySignature) {
            await this.orderRepository.updateStatus(order._id, "failed");
            throw new AppError("Invalid payment signature. Payment failed.", 400)
        }
        
        // Update stock atomically
        for(const item of order.items ){
            const product = await this.productRepository.findById(item.product)
            if(product) {
                product.stock -= item.quantity;
                await product.save();
            }
        }

        // Update order status to paid

        const updateOrder = await this.orderRepository.updateStatus(order._id, "paid", {
            razorpayPaymentId,
            razorpaySignature,
        });

        // Clear user cart after payment success
        await this.cartRepository.clearCart(order.user)

        return updateOrder;
    }

    async getUserOrders(userId) {
        return await this.orderRepository.findByUserId(userId);
    }

    // Admin Methods

    async getAllOrdersAdmin(){
        return await this.orderRepository.findAllOrders()
    }

    async updateOrderStatusAdmin(orderId,status){
        const order = await this.orderRepository.findById(orderId)
        if(!order){
            throw new AppError("Order not found", 404);
        }
        const validStatuses = ["pending", "paid", "failed", "delivered", "cancelled"];
        if(!validStatuses.includes(status)){
            throw new AppError("Invalid order status", 400);
        }
        return await this.orderRepository.updateStatus(orderId,status)
    }

    async cancelOrderUser(orderId, userId){
        // 1. Fetch Order from DB
        const order = await this.orderRepository.findById(orderId);

        if(!order){
            throw new AppError("Order not found", 404);
        }

        // 2. Ownership Verification

        if(order.user.toString() !== userId.toString()) {
            throw new AppError("Unauthorized to perform this action", 403);
        }

        // 3. Status Guard: Delivered or already cancelled orders cannot be cancelled

        if(order.status === 'delivered'){
            throw new AppError("Delivered orders cannot be cancelled", 400);
        }

        if(order.status === 'cancelled'){
            throw new AppError("Order is already cancelled", 400);
        }

        // 4. Update status in Database

        order.status = 'cancelled';
        const updateOrder = await this.orderRepository.save(order)
        return updateOrder
    } 
}
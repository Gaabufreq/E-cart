import { CartRepository } from "../repositories/cart.repository.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { OrderService } from "../services/order.service.js";
import {catchAsync} from "../utils/catchAsync.js"

const orderRepository = new OrderRepository()
const cartRepository = new CartRepository()
const productRepository = new ProductRepository()
const orderService = new OrderService(orderRepository,cartRepository,productRepository)


export class OrderController {
    checkout = catchAsync(async(req,res) => {
        const {shippingAddress} = req.body;
        const result = await orderService.createCheckoutOrder(req.user.id, shippingAddress);
        return res.status(201).json({
            success:true,
            message:"Order initiated. Proceed to payment.",
            data: result,
        });
    });

    verifyPayment = catchAsync(async(req,res) => {
        const {razorpayOrderId, razorpayPaymentId, razorpaySignature} = req.body;
        const order = await orderService.verifyPayment(
            razorpayOrderId,razorpayPaymentId,razorpaySignature
        );
        return res.status(200).json({
            success:true,
            message:"Payment verified successfully. Order confirmed.",
            data:order,
        });
    });

    getOrders = catchAsync(async(req,res) => {
        const orders = await orderService.getUserOrders(req.user.id);
        return res.status(200).json({
            success:true,
            data:orders
        });
    });

    // User Self Order Cancel Controller

    cancelOrder = catchAsync(async(req,res) => {
        const {orderId} = req.params
        const result = await orderService.cancelOrderUser(orderId,req.user.id)
        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            data: result,
        });
    })

    // Admin Controllers

    getAllOrdersAdmin = catchAsync(async(req,res) => {
        const orders = await orderService.getAllOrdersAdmin()
        return res.status(200).json({
            success: true,
            data: orders
        });
    });

    updateOrderStatusAdmin = catchAsync(async(req,res) => {
        const {orderId} = req.params;
        const {status} = req.body;
        const updatedOrder = await orderService.updateOrderStatusAdmin(orderId,status)
        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: updatedOrder
        });
    });

}
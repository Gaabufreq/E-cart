import {Order} from "../models/order.model.js"

export class OrderRepository {
    async create(orderData) {
        return await Order.create(orderData)
    }
    async findById(id){
        return await Order.findById(id).populate("items.product","title images")
    }
    async findByRazorpayOrderId(razorpayOrderId){
        return await Order.findOne({razorpayOrderId})
    }
    async findByUserId(userId) {
        return await Order.find({ user: userId })
            .populate("items.product", "title images")
            .sort({ createdAt: -1 });
    }  
    
    // Admin: Fetch all orders across system
    async findAllOrders() {
        return await Order.find().populate("user", "name email").populate("items.product", "title images").sort({createdAt: -1})
    }

    async updateStatus(id,status,paymentDetails = {}){
        return await Order.findByIdAndUpdate(
            id,
            {status,
                ...paymentDetails,
            },
            {new:true},
        );
    }

    // Helper method to save modified Mongoose order documents
    async save(orderDocument) {
        return orderDocument.save()
    }

}
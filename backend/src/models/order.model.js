import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
    product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true,
    },
    title:String,
    quantity: {type:Number, required:true},
    price: {type:Number, required:true},
});

const orderSchema = new mongoose.Schema({
   user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    },
    items:[orderItemSchema],
    totalAmount:{type:Number, required:true},
    shippingAddress: {
        street:{type:String, required:true},
        city:{type:String, required:true},
        state:{type:String, required:true},
        zipCode:{type:String, required:true},
        country:{type:String, required:true},
    },
    razorpayOrderId: {type:String, required:true},
    razorpayPaymentId: {type:String},
    razorpaySignature: {type:String},
    status:{
        type:String,
        enum:["pending","paid","failed","cancelled","delivered"],
        default:"pending",
    },
},
{timestamps:true}
)

export const Order = mongoose.model("Order",orderSchema)
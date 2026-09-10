import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
title:{
    type:String,
    required:[true, "Product title is required"],
    trim:true
},
description:{
type:String,
required:[true,"Product description is required"]
},
price:{
    type:Number,
    required:[true,"Price is required"],
    min:[0,"Price can,t be negative"]
},
category:{
    type:String,
    required:[true,"Category is required"],
    index:true,
},
stock:{
    type:Number,
    required:[true, "Stock quantity is required"],
    min:[0,"Stock cannot be negative"],
    default:0,
},
images:[{
    type:String
}],
ratings:{
    type:Number,
    default:0,
},

}, {timestamps:true})

export const Product = mongoose.model("Product", productSchema)
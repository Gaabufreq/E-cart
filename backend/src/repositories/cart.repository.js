import { Cart } from "../models/cart.model.js";

export class CartRepository {
    async findByUserId(userId) {
        return await Cart.findOne({user: userId}).populate("items.product","title price images stock");
    }

    async create(cartData){
        return await Cart.create(cartData)
    }
    async save(cart) {
            return await cart.save();
    }

    async clearCart(userId) {
        return await Cart.findOneAndUpdate(
            {user:userId},
            {items:[],totalPrice:0},
            {new:true}
        );
    }

} 
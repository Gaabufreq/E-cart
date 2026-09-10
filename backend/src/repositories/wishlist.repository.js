import { Wishlist } from "../models/wishlist.model.js";

export class WishlistRepository {
    async findByUserId(userId) {
        return await Wishlist.findOne({user:userId}).populate("products", "title price images stock ratings");
    }

    async create(wishlistData) {
        return await Wishlist.create(wishlistData);
    }

    async save(wishlist){
        return await wishlist.save()
    }
}
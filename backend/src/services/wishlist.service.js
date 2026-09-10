import { AppError } from "../utils/AppError.js";

export class WishlistService{
constructor(wishlistRepository, productRepository){
    this.wishlistRepository = wishlistRepository
    this.productRepository = productRepository
}

async getWishlist (userId){
    let wishlist = await this.wishlistRepository.findByUserId(userId)
    if(!wishlist){
        wishlist = await this.wishlistRepository.create({user: userId, products: []});
    }
    return wishlist
}

async toggleWishlist(userId,productId){
const product = await this.productRepository.findById(productId);
if(!product) throw new AppError("Product not found", 404);

let wishlist = await this.wishlistRepository.findByUserId(userId);
if(!wishlist){
    wishlist = await this.wishlistRepository.create({user:userId, products: []});
}

const exists = wishlist.products.some((id) => id._id.toString() === productId)

if(exists){
    wishlist.products = wishlist.products.filter((id) => id._id.toString() !== productId);
}else{
    wishlist.products.push(productId);
}

await this.wishlistRepository.save(wishlist)
return this.getWishlist(userId)

}

}
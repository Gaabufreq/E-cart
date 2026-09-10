import { ProductRepository } from "../repositories/product.repository.js";
import { WishlistRepository } from "../repositories/wishlist.repository.js";
import { WishlistService } from "../services/wishlist.service.js";
import { catchAsync } from "../utils/catchAsync.js";

const wishlistRepository = new WishlistRepository()
const productRepository = new ProductRepository()
const wishlistService = new WishlistService(wishlistRepository,productRepository)

export class WishlistController {
    getWishlist = catchAsync(async(req,res) => {
        const wishlist = await wishlistService.getWishlist(req.user.id)
        return res.status(200).json({success:true, data:wishlist});
    }); 

    toggleWishlist = catchAsync(async(req,res) => {
        const {productId} = req.body;
        const wishlist = await wishlistService.toggleWishlist(req.user.id,productId)
        return res.status(200).json({success:true , message:"Wishlist updated", data: wishlist})
    })
}
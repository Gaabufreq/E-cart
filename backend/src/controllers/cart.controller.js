
import { CartRepository } from "../repositories/cart.repository.js";
import {ProductRepository} from "../repositories/product.repository.js"
import { CartService } from "../services/cart.service.js";
import { catchAsync } from "../utils/catchAsync.js"


const cartRepository = new CartRepository()
const productRepository = new ProductRepository()
const cartService = new CartService(cartRepository, productRepository);

export class CartController {
    getCart = catchAsync(async(req,res) => {
        const cart = await cartService.getCart(req.user.id);
        return res.status(200).json({success:true, data:cart})
    });

    addToCart = catchAsync(async(req,res) => {
        const {productId, quantity} = req.body;
        const cart = await cartService.addToCart(req.user.id, productId, quantity);
        return res.status(200).json({success:true, message:"Item added to cart", data:cart})
    });

    removeFromCart = catchAsync(async(req,res) => {
        const {productId} = req.params;
        const cart = await cartService.removeFromCart(req.user.id, productId);
        return res.status(200).json({success:true, message:"Item removed from cart", data: cart});
    })
}
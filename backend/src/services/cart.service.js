import { AppError } from "../utils/AppError.js";

export class CartService {
    constructor(cartRepository, productRepository){
        this.cartRepository = cartRepository
        this.productRepository = productRepository
    }

    async getCart(userId){
        let cart = await this.cartRepository.findByUserId(userId)
        if(!cart){
            cart = await this.cartRepository.create({user:userId, items:[], totalPrice:0});
        }
        return cart
    }

    async addToCart(userId,productId,quantity=1){
        const product = await this.productRepository.findById(productId);
        if(!product) throw new AppError("Product not found", 404)
        if(product.stock < quantity) throw new AppError("Insufficient product stock",404);

        let cart = await this.cartRepository.findByUserId(userId);  
        if(!cart){
            cart = await this.cartRepository.create({user:userId, items: [], totalPrice:0})
        }

        const itemIndex = cart.items.findIndex((item) => item.product._id.toString() === productId);

        if(itemIndex > -1){
            const newQty = cart.items[itemIndex].quantity + quantity;

            // Agar quantity 0 ya negative ho jaye toh item auto-remove karei
            if(newQty <= 0){
                cart.items.splice(itemIndex,1)
            }else{
                if(product.stock < newQty) throw new AppError("Cannot add more than available stock", 400);
                cart.items[itemIndex].quantity = newQty;
            }
        } else{
            if(quantity <= 0) throw new AppError("Invalid quantity for new item", 400);
            if(product.stock < quantity) throw new AppError("Insufficient product stock", 400);
            cart.items.push({product:productId, quantity, price: product.price});
        }

        cart.totalPrice = cart.items.reduce((acc,item) => acc + item.quantity * item.price,0);
        await this.cartRepository.save(cart);
        return this.getCart(userId);
    }

    async removeFromCart(userId,productId) {
        let cart = await this.cartRepository.findByUserId(userId)
        if(!cart){
            throw new AppError("Cart not found", 404)
        }
        cart.items = cart.items.filter((item) => item.product._id.toString() !== productId)
        cart.totalPrice = cart.items.reduce((acc,item) => acc + item.quantity * item.price, 0);

        await this.cartRepository.save(cart);
        return this.getCart(userId)
    }

}
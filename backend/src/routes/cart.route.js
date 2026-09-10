import { Router } from 'express'
import { validate } from "../middlewares/validate.middleware.js";
import { CartController } from "../controllers/cart.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js";
import { addToCartSchema } from "../validations/cart.validation.js";


const cartRouter = Router()
const cartController = new CartController();

cartRouter.use(authenticate)

cartRouter.get("/",cartController.getCart);
cartRouter.post("/add",validate(addToCartSchema), cartController.addToCart);
cartRouter.delete("/remove/:productId", cartController.removeFromCart);

export default cartRouter
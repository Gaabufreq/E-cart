import { Router } from "express";
import { WishlistController } from "../controllers/wishlist.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const wishlistRouter = Router();
const wishlistController = new WishlistController();

wishlistRouter.use(authenticate);

wishlistRouter.get("/",wishlistController.getWishlist)
wishlistRouter.post("/toggle",wishlistController.toggleWishlist);


export default wishlistRouter
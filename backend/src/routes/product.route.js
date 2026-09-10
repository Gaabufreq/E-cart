import {Router} from 'express'
import { ProductController } from '../controllers/product.controller.js'
import { authenticate, authorize } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/upload.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { createProductSchema } from '../validations/product.validation.js'




const productRouter = Router()
const productController = new ProductController()

// Public: View Products
productRouter.get("/",productController.getAllProducts)
productRouter.get("/:id", productController.getProductById)

// Admin Only: Create Product with Images
productRouter.post(
    "/",
    authenticate, 
    authorize("admin"),
    upload.array("images",5),
    validate(createProductSchema),
    productController.createProduct
);
productRouter.put(
    "/:id",
    authenticate, 
    authorize("admin"),
     upload.array("images",5), 
     productController.updateProduct
    );
productRouter.delete(
    "/:id",
    authenticate,
     authorize("admin"),
     productController.deleteProduct
    );



export default productRouter
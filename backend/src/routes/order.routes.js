import {Router} from "express"
import { OrderController } from "../controllers/order.controller.js"
import {authenticate, authorize} from "../middlewares/auth.middleware.js"
import {validate} from "../middlewares/validate.middleware.js"
import { checkoutSchema, verifyPaymentSchema } from "../validations/order.validation.js"

const orderRouter = Router()
const orderController = new OrderController();

orderRouter.use(authenticate)

orderRouter.post("/checkout", validate(checkoutSchema), orderController.checkout)
orderRouter.post("/verify", validate(verifyPaymentSchema), orderController.verifyPayment)
orderRouter.get("/",orderController.getOrders)

// User Self Cancel Route
orderRouter.patch("/cancel/:orderId",orderController.cancelOrder)

// Admin Routes

orderRouter.get("/admin/all",authorize("admin"), orderController.getAllOrdersAdmin)
orderRouter.patch("/admin/:orderId/status", authorize("admin"), orderController.updateOrderStatusAdmin)

export default orderRouter
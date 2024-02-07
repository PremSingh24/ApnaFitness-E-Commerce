import { Router } from "express";
import { authenticateJwt } from "../middleware/auth";
import { getOrderItemsHandler, placeOrderHandler } from "../controllers/order.controller";

const router = Router();

router.route("/myorders").get(authenticateJwt , getOrderItemsHandler);
router.route("/placeorder").post(authenticateJwt , placeOrderHandler);


export default router;
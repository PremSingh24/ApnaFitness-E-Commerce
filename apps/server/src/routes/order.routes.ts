import { Router } from "express";
import { authenticateJwt } from "../middleware/auth";
import {
  getOrderItemsHandler,
  verifyOrderHandler,
  verifyPaymentHandler,
} from "../controllers/order.controller";

const router = Router();

router.route("/myorders").get(authenticateJwt, getOrderItemsHandler);
router.route("/verifyorder").post(authenticateJwt, verifyOrderHandler);
router.route("/verifypayment").post(authenticateJwt, verifyPaymentHandler);

export default router;

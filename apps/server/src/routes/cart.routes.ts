import { Router } from "express";
import { authenticateJwt } from "../middleware/auth";
import { addItemToCartHandler, getCartItemsHandler , removeItemFromCartHandler, updateCartItemHandler } from "../controllers/cart.controller";

const router = Router();

router.route("/mycart").get(authenticateJwt , getCartItemsHandler );
router.route("/:ProductId").post(authenticateJwt , addItemToCartHandler);
router.route("/:CartId").put(authenticateJwt , updateCartItemHandler);
router.route("/:CartId").delete(authenticateJwt , removeItemFromCartHandler);

export default router;
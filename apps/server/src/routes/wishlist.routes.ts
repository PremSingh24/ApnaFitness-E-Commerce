import { Router } from "express";
import { authenticateJwt } from "../middleware/auth";
import { addItemsToWishlistHandler, getWishlistItemsHandler, removeItemsFromWishlistHandler } from "../controllers/wishlist.controller";

const router = Router();

router.route("/mywishlist").get(authenticateJwt , getWishlistItemsHandler);
router.route("/:ProductId").post(authenticateJwt , addItemsToWishlistHandler);
router.route("/:ProductId").delete(authenticateJwt , removeItemsFromWishlistHandler);

export default router;
import { Router } from "express";
import {
  getAllProductsHandler,
  getProductHandler,
  getTrendingProductsHandler,
} from "../controllers/product.controller";

const router = Router();

router.route("/trending").get(getTrendingProductsHandler);

router.route("/all").get(getAllProductsHandler);

router.route("/:ProductId").get(getProductHandler);

export default router;

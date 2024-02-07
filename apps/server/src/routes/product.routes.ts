import { Router } from "express";
import { getAllProductsHandler, getProductHandler } from "../controllers/product.controller";

const router = Router();

router.route("/all").get(getAllProductsHandler);

router.route("/:ProductId").get(getProductHandler);

//router.route("/add").post(newProduct)


export default router;
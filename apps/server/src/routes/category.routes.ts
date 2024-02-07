import { Router } from "express";
import { getCategoryHandler, getCategoryItemsHandler } from "../controllers/category.controller";

const router = Router();

router.route("/all").get(getCategoryHandler);
router.route("/:CategoryId").get(getCategoryItemsHandler);
//router.route("/add").post(addCategory)


export default router;
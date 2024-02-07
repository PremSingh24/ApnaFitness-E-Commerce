import { Router } from "express";
import { addAddressHandler, getAddressHandler, removeAddressHandler, updateAddressHandler } from "../controllers/address.controller";
import { authenticateJwt } from "../middleware/auth";

const router = Router();


router.route("/myaddress").get(authenticateJwt , getAddressHandler);
router.route("/newaddress").post(authenticateJwt , addAddressHandler);
router.route("/:AddressId").put(authenticateJwt , updateAddressHandler);
router.route("/:AddressId").delete(authenticateJwt , removeAddressHandler);


export default router;
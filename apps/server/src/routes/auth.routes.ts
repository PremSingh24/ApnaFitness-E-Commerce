import { Router } from "express";
import { authenticateJwt } from "../middleware/auth";
import { authenticateUserHandler, loginUserHandler, registerUserHandler } from "../controllers/auth.controller";

const router = Router();

router.route("/register").post(registerUserHandler);
router.route("/login").post(loginUserHandler);
router.route("/authenticate").get(authenticateJwt , authenticateUserHandler);

export default router;
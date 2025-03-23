import {authController} from "../controller/auth";
import {Router} from "express";

const router = Router();

router.post("/login", authController.login);

export const authRouter = router;
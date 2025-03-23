import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {userController} from "../controller/user";

const router = Router();

router.get("/fetch-user-data", authMiddleware, userController.getAll)
router.get("/detail-user-data/:id", authMiddleware, userController.getById)
router.post("/create-user-data", authMiddleware, userController.add)
router.put("/update-user-data/:id", authMiddleware, userController.update)
router.delete("/delete-user-data/:id", authMiddleware, userController.remove)

export const userRouter = router;
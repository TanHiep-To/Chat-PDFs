import { Router } from "express";
import userController, { UserController } from "./user.controller";

const router = Router();

router.post("/", userController.create);
router.get("/", userController.getAll);

export default router;

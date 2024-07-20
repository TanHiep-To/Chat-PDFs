import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/", UserController.create);
router.get("/", UserController.findAll);
router.get("/:id", UserController.findById);

export const UserRouter = router;

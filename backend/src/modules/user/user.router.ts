import { Router } from "express";
import { UserController } from "./user.controller";
import { isLogged } from "../../middlewares/auth";

const router = Router();

router.post("/", UserController.create);
router.get("/", UserController.findAll);
router.get("/:id", UserController.findById);
router.get("/me", isLogged, UserController.me);

export const UserRouter = router;

import { Router } from "express";
import { UserController } from "./user.controller";
import { isLogged } from "../../middlewares/auth";

const router = Router();

router.get("/me", isLogged, UserController.me);
router.post("/", UserController.create);
router.get("/all", UserController.findAll);
router.get("/:id", UserController.findById);
router.get("/email/:email", UserController.findByEmail);
export const UserRouter = router;

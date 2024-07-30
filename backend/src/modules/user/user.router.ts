import { Router } from "express";
import { UserController } from "./user.controller";
import { isLogged } from "../../middlewares/auth";

const router = Router();

router.get("/me", isLogged, UserController.me);
router.post("/", UserController.create);
router.get("/all", UserController.findAll);
router.get("/:id", UserController.findById);
router.get("/email/:email", UserController.findByEmail);
router.put("/me", isLogged, UserController.updateMe);
router.put("/:id", isLogged, UserController.updateOne);
router.delete("/:id", UserController.deleteOne);

export const UserRouter = router;

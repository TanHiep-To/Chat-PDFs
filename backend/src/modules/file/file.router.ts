import { Router } from "express";
import { FileController } from "./file.controller";
import { isLogged } from "../../middlewares/auth";

const router = Router();

router.post("/", isLogged, FileController.create);
router.get("/all", FileController.findAll);
router.get("/:id", FileController.findById);
router.get("/:userId", FileController.findByUserId);

export const FileRouter = router;

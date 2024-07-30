import { Router } from "express";
import { FileController } from "./file.controller";
import { isLogged } from "../../middlewares/auth";

const router = Router();

router.post("/", isLogged, FileController.create);
router.get("/all", FileController.findAll);
router.get("/me", isLogged, FileController.findMine);
router.get("/list/:userId", FileController.findByUserId);
router.get("/:id", FileController.findById);
router.delete("/:id", isLogged, FileController.deleteOne);
router.delete("/", isLogged, FileController.deleteMany);
export const FileRouter = router;

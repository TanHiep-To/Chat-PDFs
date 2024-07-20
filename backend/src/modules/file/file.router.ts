import { Router } from "express";
import { FileController } from "./file.controller";

const router = Router();

router.post("/", FileController.create);
router.get("/", FileController.findAll);
router.get("/:id", FileController.findById);
router.get("/:userId", FileController.findByUserId);

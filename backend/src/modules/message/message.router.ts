import { Router } from "express";
import { MessageController } from "./message.controller";

const router = Router();

router.post("/", MessageController.create);
router.get("/", MessageController.findAll);
router.get("/:id", MessageController.findById);
router.get("/", MessageController.findByUserIdAndFileId);

export const MessageRouter = router;

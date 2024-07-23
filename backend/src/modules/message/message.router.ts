import { Router } from "express";
import { MessageController } from "./message.controller";

const router = Router();

router.post("/", MessageController.create);
router.post("/bot", MessageController.botCreate);
router.get("/all", MessageController.findAll);
router.get("/:id", MessageController.findById);
router.get("/", MessageController.findByFileId);

export const MessageRouter = router;

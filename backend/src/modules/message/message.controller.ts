import Express from "express";
import { MessageService } from "./message.service";

const create = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const { fileId, content } = req.body;
    const message = await MessageService.create({ fileId, content });
    res.status(201).json({
      success: true,
      data: message,
      message: "Message created",
    });
  } catch (error) {
    next(error);
  }
};

const findAll = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const messages = await MessageService.findAll();
    res.status(200).json({
      success: true,
      data: messages,
      message: `${messages.length} messages found`,
    });
  } catch (error) {
    next(error);
  }
};

const findById = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const { id } = req.params;
    const message = await MessageService.findOne(id);
    if (!message) {
      res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({
      success: true,
      data: message,
      message: `Message with id ${id} found`,
    });
  } catch (error) {
    next(error);
  }
};

const findByUserIdAndFileId = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const { userId, fileId } = req.params;
    const messages = await MessageService.findByFileId(fileId);
    res.status(200).json({
      success: true,
      data: messages,
      message: `${messages.length} messages found`,
    });
  } catch (error) {
    next(error);
  }
};

export const MessageController = {
  create,
  findAll,
  findById,
  findByUserIdAndFileId,
};

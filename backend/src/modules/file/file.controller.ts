import Express, { NextFunction } from "express";
import { UserService } from "../user/user.service";
import { getErrorMessage } from "../../common/error";
import { FileService } from "./file.service";

const create = async (
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body;
    const { name, key, size, type } = req.body;
    const file = await FileService.create({
      name,
      key,
      size,
      type,
      userId: user.id,
    });
    res.status(201).json({
      success: true,
      data: file,
      message: "File created",
    });
  } catch (error) {
    next(error);
  }
};

const findAll = async (
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
) => {
  try {
    const files = await FileService.findAll();
    res.status(200).json({
      success: true,
      data: files,
      message: `${files.length} files found`,
    });
  } catch (error) {
    next(error);
  }
};

const findById = async (
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const file = await FileService.findOne(id);
    res.status(200).json({
      success: true,
      data: file,
      message: `File with id ${id} found`,
    });
  } catch (error) {
    next(error);
  }
};

const findMine = async (
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body;
    const files = await FileService.findByUserId(user.id);
    res.status(200).json({
      success: true,
      data: files,
      message: `${files.length} files found`,
    });
  } catch (error) {
    next(error);
  }
};

const findByUserId = async (
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const files = await FileService.findByUserId(userId);
    res.status(200).json({
      success: true,
      data: files,
      message: `${files.length} files found`,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await FileService.deleteOne(id);
    res.status(200).json({
      success: true,
      message: `File with id ${id} deleted`,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMany = async (
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
) => {
  try {
    const { ids } = req.body;
    await FileService.deleteMany(ids);
    res.status(200).json({
      success: true,
      message: `${ids.length} files deleted`,
    });
  } catch (error) {
    next(error);
  }
};

export const FileController = {
  create,
  findAll,
  findById,
  findMine,
  findByUserId,
  deleteOne,
  deleteMany,
};

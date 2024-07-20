import * as Express from "express";
import { UserService } from "./user.service";
import { getErrorMessage } from "../../common/error";

const create = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserService.create({ name, email, password });
    res.status(201).json({
      success: true,
      data: user,
      message: `User ${user.email} created`,
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
    const users = await UserService.findAll();
    res.status(200).json({
      success: true,
      data: users,
      message: `${users.length} users found`,
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
    const user = await UserService.findOne(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      data: user,
      message: `User with id ${id} found`,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  create,
  findAll,
  findById,
};

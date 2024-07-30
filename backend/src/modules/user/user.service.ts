import { User } from "./user.entity";
import {
  IUpdateUserPayload,
  IUser,
  IUserPayload,
  UserRole,
} from "./user.interface";
import { Inject, Service } from "typedi";
import { AppDataSource } from "../../config/dataSource";
import ApiError from "../../common/ApiError";
import { comparePassword, hashPassword } from "../../utils/password";
import { genToken } from "../../utils/jwt";
import { MessageService } from "../message/message.service";
import { FileService } from "../file/file.service";
import { In } from "typeorm";

const create = async (user: IUserPayload): Promise<IUser> => {
  const existing = await AppDataSource.getRepository(User).findOneBy({
    email: user.email,
  });
  if (existing) {
    throw new ApiError(400, "User already exists");
  }
  return AppDataSource.getRepository(User).save(user);
};

const findAll = async (): Promise<IUser[]> => {
  return AppDataSource.getRepository(User).find({
    select: [
      "id",
      "name",
      "email",
      "role",
      "is_banned",
      "is_verified",
      "is_vip",
      "created_at",
      "updated_at",
    ],
    where: { role: In([UserRole.USER, UserRole.ADMIN]) },
  });
};

const findOne = async (id: string): Promise<IUser> => {
  const user = await AppDataSource.getRepository(User).findOneBy({ id });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

const findByEmail = async (email: string): Promise<IUser> => {
  const user = await AppDataSource.getRepository(User).findOneBy({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

const update = async (
  id: string,
  user: IUpdateUserPayload
): Promise<string> => {
  const existing = await AppDataSource.getRepository(User).findOneBy({ id });
  if (!existing) {
    throw new ApiError(404, "User not found");
  }

  let updatedUser;
  if (user.password) {
    const checkPassword = await comparePassword(
      user.password,
      existing.password
    );
    if (!checkPassword) {
      throw new ApiError(400, "Password is incorrect");
    }
    const hashedPassword = await hashPassword(user.password);
    updatedUser = await AppDataSource.getRepository(User).save({
      ...existing,
      ...user,
      password: hashedPassword,
    });
  } else {
    updatedUser = await AppDataSource.getRepository(User).save({
      ...existing,
      ...user,
    });
  }

  const newToken = await genToken({
    id: updatedUser.id,
    email: updatedUser.email,
    name: updatedUser.name,
    role: updatedUser.role,
  });

  return newToken;
};

const deleteOne = async (id: string): Promise<void> => {
  const existing = await AppDataSource.getRepository(User).findOneBy({ id });
  if (!existing) {
    throw new ApiError(404, "User not found");
  }

  await FileService.deleteByUserId(id);
  await AppDataSource.getRepository(User).delete({ id });
};

export const UserService = {
  create,
  findAll,
  findOne,
  findByEmail,
  update,
  deleteOne,
};

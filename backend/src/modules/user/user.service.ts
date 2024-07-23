import { User } from "./user.entity";
import { IUser, IUserPayload } from "./user.interface";
import { Inject, Service } from "typedi";
import { AppDataSource } from "../../config/dataSource";
import ApiError from "../../common/ApiError";

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
  return AppDataSource.getRepository(User).find();
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

export const UserService = {
  create,
  findAll,
  findOne,
  findByEmail,
};

import { DataSource, Entity, Repository } from "typeorm";
import { User } from "./user.entity";
import { IUser, IUserPayload, IUserService } from "./user.interface";
import { Inject, Service } from "typedi";
import { AppDataSource } from "../../config/dataSource";

// @Service("userService")
// export class UserService implements IUserService {
//   private userRepository: Repository<User>;
//   constructor(@Inject("dataSource") private appDataSource: DataSource) {
//     this.userRepository = this.appDataSource.getRepository(User);
//   }
//   create = async (user: IUserPayload): Promise<IUser> => {
//     const existingUser = await this.userRepository.findOneBy({
//       email: user.email,
//     });
//     if (existingUser) {
//       throw new Error("User already exists");
//     }

//     return this.userRepository.save(user);
//   };

//   findAll = async (): Promise<IUser[]> => {
//     return this.userRepository.find();
//   };

//   findOne = async (id: string): Promise<IUser | null> => {
//     return this.userRepository.findOneBy({ id });
//   };

//   update = async (id: string, user: IUserPayload): Promise<IUser> => {
//     const existingUser = await this.userRepository.findOneBy({ id });
//     if (!existingUser) {
//       throw new Error("User not found");
//     }
//     await this.userRepository.update(id, user);
//     const updatedUser = await this.userRepository.findOneBy({ id });
//     if (!updatedUser) {
//       throw new Error("User not updated");
//     }

//     return updatedUser;
//   };

//   remove = async (id: string): Promise<void> => {
//     const existingUser = await this.userRepository.findOneBy({ id });
//     if (!existingUser) {
//       throw new Error("User not found");
//     }

//     this.userRepository.delete(id);
//   };
// }

// const userService = new UserService();
// export default userService;

const create = async (user: IUserPayload): Promise<IUser> => {
  const existing = await AppDataSource.getRepository(User).findOneBy({
    email: user.email,
  });
  if (existing) {
    throw new Error("User already exists");
  }
  return AppDataSource.getRepository(User).save(user);
};

const findAll = async (): Promise<IUser[]> => {
  return AppDataSource.getRepository(User).find();
};

const findOne = async (id: string): Promise<IUser | null> => {
  return AppDataSource.getRepository(User).findOneBy({ id });
};

export default {
  create,
  findAll,
  findOne,
};

import { Entity } from "typeorm";
import { AppDataSource } from "../../config/dataSource";
import { User } from "./user.entity";
import { IUser, IUserPayload, IUserService } from "./user.interface";

export class UserService implements IUserService {
  private userRepository = AppDataSource.getRepository(User);

  constructor() {}
  async create(user: IUserPayload): Promise<IUser> {
    const existingUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (existingUser) {
      throw new Error("User already exists");
    }

    return this.userRepository.save(user);
  }
  findAll(): Promise<IUser[]> {
    return this.userRepository.find();
  }
  findOne(id: string): Promise<IUser | null> {
    return this.userRepository.findOne({ where: { id } });
  }
  async update(id: string, user: IUserPayload): Promise<IUser> {
    const existingUser = await this.userRepository.findOneBy({ id });
    if (!existingUser) {
      throw new Error("User not found");
    }
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (!updatedUser) {
      throw new Error("User not updated");
    }

    return updatedUser;
  }
  async remove(id: string): Promise<void> {
    const existingUser = this.userRepository.findOneBy({ id });
    if (!existingUser) {
      throw new Error("User not found");
    }

    await this.userRepository.delete(id);
  }
}

const userService = new UserService();
export default userService;

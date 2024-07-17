import { AppDataSource } from "../../config/dataSource";
import { genToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/password";
import { User } from "../user/user.entity";
import { Role } from "../user/user.interface";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);
  constructor() {}
  async register(
    name: string,
    email: string,
    password: string,
    role: Role = Role.USER
  ): Promise<User> {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await hashPassword(password);
    return this.userRepository.save({
      name,
      email,
      password: hashedPassword,
      role,
    });
  }

  async login(email: string, password: string): Promise<string> {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (!comparePassword(password, user.password)) {
      throw new Error("Invalid password");
    }

    const token = await genToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return token;
  }
}

const authService = new AuthService();
export default authService;

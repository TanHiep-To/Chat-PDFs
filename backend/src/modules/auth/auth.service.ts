import ApiError from "../../common/ApiError";
import { AppDataSource } from "../../config/dataSource";
import { genToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/password";
import { User } from "../user/user.entity";
import { UserRole } from "../user/user.interface";

const register = async (
  name: string,
  email: string,
  password: string,
  role: UserRole = UserRole.USER
): Promise<User> => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const existingUser = await AppDataSource.getRepository(User).findOneBy({
    email,
  });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }
  const hashedPassword = await hashPassword(password);
  return AppDataSource.getRepository(User).save({
    name,
    email,
    password: hashedPassword,
    role,
  });
};

const login = async (email: string, password: string): Promise<string> => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const user = await AppDataSource.getRepository(User).findOneBy({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const checkPassword = await comparePassword(password, user.password);
  if (!checkPassword) {
    throw new ApiError(400, "Invalid password");
  }

  const token = await genToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  return token;
};

export const AuthService = {
  register,
  login,
};

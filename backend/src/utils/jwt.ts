import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/const";
import { UserRole } from "../modules/user/user.interface";

export interface ITokenPayload {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export const genToken = async (data: ITokenPayload, expire: string = "10d") => {
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: expire });
  return token;
};

export const verifyToken = async (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET) as ITokenPayload;
  return decoded;
};

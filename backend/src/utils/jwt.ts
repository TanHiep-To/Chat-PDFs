import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/const";
import { Role } from "../modules/user/user.interface";

export interface ITokenPayload {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export const genToken = async (data: ITokenPayload, expire: number = 100) => {
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: expire });
  return token;
};

export const verifyToken = async (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET) as ITokenPayload;
  return decoded;
};

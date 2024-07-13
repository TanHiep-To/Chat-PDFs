import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { Role } from "../modules/user/user.interface";

export const isLogged = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  req.body.user = decoded;
  next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.body.user;
  if (role !== Role.ADMIN) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

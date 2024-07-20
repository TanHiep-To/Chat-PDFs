import * as Express from "express";
import { AuthService } from "./auth.service";
import { getErrorMessage } from "../../common/error";

const register = async (req: Express.Request, res: Express.Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await AuthService.register(name, email, password);
    res.status(201).json({
      success: true,
      data: user,
      message: `User ${user.email} created`,
    });
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) });
  }
};

const login = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);
    res.status(200).json({
      success: true,
      data: { token },
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  register,
  login,
};

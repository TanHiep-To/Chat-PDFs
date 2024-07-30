import * as Express from "express";
import { AuthService } from "./auth.service";
import { getErrorMessage } from "../../common/error";

const register = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const user = await AuthService.register(name, email, password);
    res.status(201).json({
      success: true,
      data: user,
      message: `User ${user.email} created`,
    });
  } catch (error) {
    next(error);
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
      message: "Login successfully",
    });
  } catch (error) {
    next(error);
  }
};

const otp = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const { otp } = req.body;
    const result = await AuthService.verification(otp);
    res.status(200).json({
      success: true,
      data: result,
      message: "OTP verified",
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  register,
  login,
  otp,
};

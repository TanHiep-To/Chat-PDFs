import * as Express from "express";
import authService, { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Express.Request, res: Express.Response) => {
    try {
      const { name, email, password } = req.body;
      const user = await this.authService.register(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };

  login = async (req: Express.Request, res: Express.Response) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
}

const authController = new AuthController(authService);
export default authController;

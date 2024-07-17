import { Inject, Service } from "typedi";
import UserService from "./user.service";
import * as Express from "express";

// @Service("userController")
// export class UserController {
//   constructor(@Inject("userService") private userService: UserService) {}
//   create = async (req: Express.Request, res: Express.Response) => {
//     try {
//       const { name, email, password } = req.body;
//       const user = await this.userService.create({ name, email, password });
//       res.status(201).json(user);
//     } catch (error) {
//       res.status(400).json({ message: error });
//     }
//   };

//   getAll = async (req: Express.Request, res: Express.Response) => {
//     try {
//       const users = await this.userService.findAll();
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(400).json({ message: error });
//     }
//   };

//   getById = async (req: Express.Request, res: Express.Response) => {
//     try {
//       const { id } = req.params;
//       const user = await this.userService.findOne(id);
//       if (!user) {
//         res.status(404).json({ message: "User not found" });
//       }
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(400).json({ message: error });
//     }
//   };
// }

// const userController = new UserController(userService);
// export default userController;

const create = async (req: Express.Request, res: Express.Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserService.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getAll = async (req: Express.Request, res: Express.Response) => {
  try {
    const users = await UserService.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getById = async (req: Express.Request, res: Express.Response) => {
  try {
    const { id } = req.params;
    const user = await UserService.findOne(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export default {
  create,
  getAll,
  getById,
};

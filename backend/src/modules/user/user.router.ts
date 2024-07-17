import { Router } from "express";
import UserController from "./user.controller";

const router = Router();

router.post("/", UserController.create);
router.get("/", UserController.getAll);

export default router;

// @Service()
// export class UserRouter {
//   constructor(
//     @Inject("userController") private userController: UserController
//   ) {}

//   public getRouter() {
//     const router = Router();

//     router.post("/", this.userController.create);
//     router.get("/", this.userController.getAll);

//     return router;
//   }
// }

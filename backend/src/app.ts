import express from "express";
import authRouter from "./modules/auth/auth.router";
import UserRouter from "./modules/user/user.router";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "./config/swagger";
import cors from "./config/cors";

// Container.set("dataSource", AppDataSource);
const app = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

// const userRouter = Container.get(UserRouter);

app.use("/users", UserRouter);
app.use("/auth", authRouter);

export default app;

import "reflect-metadata";
import express from "express";
import cors from "cors";
import userRouter from "./modules/user/user.router";
import authRouter from "./modules/auth/auth.router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

export default app;

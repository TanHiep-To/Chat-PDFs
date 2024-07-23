import express from "express";
// import cookieParser from "cookie-parser";
import { AuthRouter } from "./modules/auth/auth.router";
import { UserRouter } from "./modules/user/user.router";
import cors from "./config/cors";
import { MessageRouter } from "./modules/message/message.router";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { FileRouter } from "./modules/file/file.router";

const app = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", AuthRouter);
app.use("/users", UserRouter);
app.use("/messages", MessageRouter);
app.use("/files", FileRouter);

// global error handler
app.use(globalErrorHandler);

export default app;

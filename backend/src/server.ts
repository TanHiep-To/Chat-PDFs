import "reflect-metadata";
import Container from "typedi";
import app from "./app";
import { AppDataSource } from "./config/dataSource";

const bootstrap = async () => {
  await AppDataSource.initialize();
  app.listen(8000, () => {
    console.log("Server is running on: http://localhost:3000");
  });
};

bootstrap();

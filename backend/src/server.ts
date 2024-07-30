import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/dataSource";
import { RedisClient } from "./config/redis";

const bootstrap = async () => {
  await AppDataSource.initialize();
  await RedisClient.connect();
  app.listen(8000, () => {
    console.log("Server is running on: http://localhost:8000");
  });
};

bootstrap();

import { createClient } from "redis";
import { REDIS_URL } from "./const";

export const RedisClient = createClient({ url: REDIS_URL });

RedisClient.on("ready", () => console.log("Redis client connected"));
RedisClient.on("error", () => console.error("Redis refused to connect"));

export const MONGO_URI =
  (process.env.MONGO_URI as string) || "mongodb://localhost:27017/chat-pdf";
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

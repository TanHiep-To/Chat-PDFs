import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = Number(process.env.DB_PORT) || 5432;
export const DB_USERNAME = process.env.DB_USERNAME || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
export const DB_DATABASE = process.env.DATABASE || "chat_pdf";

export const PORT = Number(process.env.PORT) || 4000;

export const SALT = Number(process.env.SALT_ROUNDW) || 10;
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

export const SMTP_HOST = process.env.SMTP_HOST || "smtp.mailtrap.io";
export const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
export const SMTP_USERNAME = process.env.SMTP_USERNAME || "user";
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "pass";

export const UPLOADTHING_URL_HEADER = process.env.UPLOADTHING_URL_HEADER;
export const UPLOADTHING_SECRET = process.env.UPLOADTHING_SECRET;
export const UPLOADTHING_APP_ID = process.env.UPLOADTHING_APP_ID;

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
export const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;
export const PINECONE_ENVIRONMENT = process.env.PINECONE_ENVIRONMENT;

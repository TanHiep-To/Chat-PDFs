import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./config/swagger";
import swaggerJsdoc from "swagger-jsdoc";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
const app = express();

export const initApp = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  const yoga = await createYoga(schema);

  app.all("/graphql", yoga);

  return app;
};

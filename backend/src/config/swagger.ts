import swaggerJSDoc from "swagger-jsdoc";
import UserRouter from "../modules/user/user.router";
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "ChatPDF API Documentation",
      version: "1.0.0",
      description: "ChatPDF API Documentation",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["src/modules/user/user.router.ts"],
  // apis: ["./dist/modules/user/user.router.js"],
};

export const swaggerConfig = swaggerJSDoc(swaggerOptions);

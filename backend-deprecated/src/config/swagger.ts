const swaggerOptions = {
  definition: {
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Chat-pdf API",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerOptions;

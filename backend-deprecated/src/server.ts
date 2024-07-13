import { initApp } from "./app";
// import { connectToDatabase } from "./config/db";

const start = async () => {
  const app = await initApp();
  // await connectToDatabase();
  app.listen(8000, () => {
    console.log("Server is running on: http://localhost:8000");
  });
};

start();

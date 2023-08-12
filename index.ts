import express, { Application } from "express";
import dotenv from "dotenv";
import { dbConfig } from "./Config/database";
import { mainApp } from "./mainApp";
dotenv.config();

const port: number = parseInt(process.env.PORT!);
const app: Application = express();

mainApp(app);

const server = app.listen(port || process.env.PORT, () => {
  console.log();
  dbConfig();
});

process.on("uncaughtException", (error: any) => {
  console.log("uncaughtException", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection", reason);
  server.close(() => {
    process.exit(1);
  });
});

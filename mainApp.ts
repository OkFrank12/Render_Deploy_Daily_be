import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { HTTP, mainError } from "./error/mainError";
import { errorHandler } from "./error/errorHandler";
import user from "./Router/userRouter";
import post from "./Router/postRouter";
import comment from "./Router/commentRouter";

export const mainApp = (app: Application) => {
  app.use(express.json()).use(
    cors({
      origin: "*", //can take any url...
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );
  app.get("/", (req: Request, res: Response) => {
    return res.status(HTTP.OK).json({
      mesage: "Awesome Code~~",
    });
  });

  app.use("/api/v1", user);
  app.use("/api/v1", post);
  app.use("/api/v1", comment);

  app
    .all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new mainError({
          name: "Route Error",
          message: `This Error is coming up because the ${req.originalUrl} URL isn't correct`,
          status: HTTP.BAD,
          success: false,
        })
      );
    })
    .use(errorHandler);
};

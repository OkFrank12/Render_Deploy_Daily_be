import express, { Router } from "express";
import { check } from "express-validator";
import { Upload } from "../Config/multer";
import {
  createUser,
  readAllUser,
  readOneUser,
  signInUser,
} from "../Controller/userController";

const user: Router = express.Router();

user.route("/register").post(Upload, createUser);
user.route("/sign-in").post(signInUser);
user.get("/get-users", readAllUser);
user.get("/:userID/get-user", readOneUser);

export default user;

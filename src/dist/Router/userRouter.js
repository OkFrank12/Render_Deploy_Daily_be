"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../Config/multer");
const userController_1 = require("../Controller/userController");
const user = express_1.default.Router();
user.route("/register").post(multer_1.Upload, userController_1.createUser);
user.route("/sign-in").post(userController_1.signInUser);
user.get("/get-users", userController_1.readAllUser);
user.get("/:userID/get-user", userController_1.readOneUser);
exports.default = user;

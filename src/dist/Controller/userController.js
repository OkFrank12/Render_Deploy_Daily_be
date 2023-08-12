"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readOneUser = exports.readAllUser = exports.signInUser = exports.createUser = void 0;
const mainError_1 = require("../error/mainError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../Model/userModel"));
const cloudinary_1 = __importDefault(require("../Config/cloudinary"));
const express_validator_1 = require("express-validator");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload(req.file.path);
        const user = yield userModel_1.default.create({
            name,
            email,
            password: hash,
            avatar: secure_url,
            avatarID: public_id,
        });
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "Created User",
            data: user,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Route Error",
            message: `This Error came as a result of you creating this user`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.createUser = createUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const error = (0, express_validator_1.validationResult)(req);
        // if (error) {
        //   return res.status(HTTP.BAD).json(error);
        // }
        const signIn = yield userModel_1.default.findOne({ email });
        if (signIn) {
            const hash = yield bcrypt_1.default.compare(password, signIn.password);
            if (hash) {
                return res.status(mainError_1.HTTP.CREATE).json({
                    message: `Welcome Back ${signIn.name}`,
                    data: signIn._id,
                });
            }
            else {
                new mainError_1.mainError({
                    name: "Invalid Password Error",
                    message: `User Password is not correct`,
                    status: mainError_1.HTTP.BAD,
                    success: false,
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "User Not Found",
            });
        }
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Sign in Error",
            message: `This Error came as a result of you signing in`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
        });
    }
});
exports.signInUser = signInUser;
const readAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: "Reading all users",
            data: user,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Reading All Users Error",
            message: `This Error came as a result of you getting all users`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
    }
});
exports.readAllUser = readAllUser;
const readOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        return res.status(mainError_1.HTTP.OK).json({
            message: "Reading one users",
            data: user,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Reading One User Error",
            message: `This Error came as a result of you getting one users`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
    }
});
exports.readOneUser = readOneUser;

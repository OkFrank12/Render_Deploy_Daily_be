"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mainError_1 = require("./error/mainError");
const errorHandler_1 = require("./error/errorHandler");
const userRouter_1 = __importDefault(require("./Router/userRouter"));
const postRouter_1 = __importDefault(require("./Router/postRouter"));
const commentRouter_1 = __importDefault(require("./Router/commentRouter"));
const mainApp = (app) => {
    app.use(express_1.default.json()).use((0, cors_1.default)({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    }));
    app.get("/", (req, res) => {
        return res.status(mainError_1.HTTP.OK).json({
            mesage: "Awesome Code~~",
        });
    });
    app.use("/api/v1", userRouter_1.default);
    app.use("/api/v1", postRouter_1.default);
    app.use("/api/v1", commentRouter_1.default);
    app
        .all("*", (req, res, next) => {
        next(new mainError_1.mainError({
            name: "Route Error",
            message: `This Error is coming up because the ${req.originalUrl} URL isn't correct`,
            status: mainError_1.HTTP.BAD,
            success: false,
        }));
    })
        .use(errorHandler_1.errorHandler);
};
exports.mainApp = mainApp;

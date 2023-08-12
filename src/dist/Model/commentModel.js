"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentModel = new mongoose_1.default.Schema({
    content: {
        type: String,
    },
    userID: {
        type: String,
    },
    vote: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "likes",
        },
    ],
    reply: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "replys",
        },
    ],
    post: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "posts",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("comments", commentModel);

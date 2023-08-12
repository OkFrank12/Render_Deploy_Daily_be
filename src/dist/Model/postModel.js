"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postModel = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    image: {
        type: String,
    },
    imageID: {
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
    tags: {
        type: (Array),
    },
    comment: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "comments",
        },
    ],
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "users",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("posts", postModel);

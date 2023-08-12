"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const replyModel = new mongoose_1.default.Schema({
    content: {
        type: String,
    },
    userID: {
        type: String,
    },
    positiveVote: {
        type: (Array),
    },
    comment: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "comments",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("replys", replyModel);

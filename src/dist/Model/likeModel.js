"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const likeModel = new mongoose_1.default.Schema({
    userID: {
        type: String,
        default: false,
    },
    like: {
        type: Boolean,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("likes", likeModel);

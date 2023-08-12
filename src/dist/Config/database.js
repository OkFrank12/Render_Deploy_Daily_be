"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.DATABASE;
const dbConfig = () => {
    mongoose_1.default.connect(url).then(() => {
        console.log("Server is connected with the Database 🎉✨🎇");
    });
};
exports.dbConfig = dbConfig;

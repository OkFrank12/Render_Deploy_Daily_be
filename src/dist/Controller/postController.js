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
exports.viewVotedPost = exports.unVoteUserPost = exports.voteUserPost = exports.readUsersPost = exports.readPost = exports.createPost = void 0;
const postModel_1 = __importDefault(require("../Model/postModel"));
const mainError_1 = require("../error/mainError");
const userModel_1 = __importDefault(require("../Model/userModel"));
const cloudinary_1 = __importDefault(require("../Config/cloudinary"));
const mongoose_1 = __importDefault(require("mongoose"));
const likeModel_1 = __importDefault(require("../Model/likeModel"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userID } = req.params;
        const { title, content } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
            const post = yield postModel_1.default.create({
                title,
                content,
                image: secure_url,
                imageID: public_id,
                userID,
                user,
            });
            user.post.push(new mongoose_1.default.Types.ObjectId(post._id));
            user.save();
            return res.status(mainError_1.HTTP.CREATE).json({
                message: "post created",
                data: post,
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "Error",
            });
        }
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Creating Post Error",
            message: `This Error came as a result of you creating this post`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error",
        });
    }
});
exports.createPost = createPost;
const readPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: "Reading Post",
            data: post,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Reading Post error",
            message: `This Error came as a result of you getting this post`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error",
        });
    }
});
exports.readPost = readPost;
const readUsersPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID).populate({
            path: "post",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(mainError_1.HTTP.OK).json({
            message: "Reading User Post",
            data: user,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Reading Users Post error",
            message: `This Error came as a result of you getting user post`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
        });
    }
});
exports.readUsersPost = readUsersPost;
const voteUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { userID, postID } = req.params;
        const post = yield postModel_1.default.findById(postID);
        const user = yield userModel_1.default.findById(userID);
        const like = yield likeModel_1.default.create({
            userID,
            like: true,
        });
        (_b = post === null || post === void 0 ? void 0 : post.vote) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.default.Types.ObjectId(user._id));
        post === null || post === void 0 ? void 0 : post.save();
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "Vote User Post",
            data: like,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Vote User Post Error",
            message: `This Error came as a result of you voting this post`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error",
        });
    }
});
exports.voteUserPost = voteUserPost;
const unVoteUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { userID, postID, likeID } = req.params;
        const post = yield postModel_1.default.findById(postID);
        const user = yield userModel_1.default.findById(userID);
        const like = yield likeModel_1.default.findById(likeID);
        const likes = yield likeModel_1.default.findByIdAndUpdate(likeID, {
            userID,
            like: false,
        }, { new: true });
        (_c = post === null || post === void 0 ? void 0 : post.vote) === null || _c === void 0 ? void 0 : _c.pull(new mongoose_1.default.Types.ObjectId(user._id));
        post === null || post === void 0 ? void 0 : post.save();
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "unVote User Post",
            data: likes,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "unVote User Post Error",
            message: `This Error came as a result of you unVote this post`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error",
        });
    }
});
exports.unVoteUserPost = unVoteUserPost;
const viewVotedPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const post = yield postModel_1.default.findById(postID).populate({
            path: "vote",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(mainError_1.HTTP.OK).json({
            message: "view voted Post",
            data: post === null || post === void 0 ? void 0 : post.vote,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "view voted Post Error",
            message: `This Error came as a result of you viewing voted post`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error",
        });
    }
});
exports.viewVotedPost = viewVotedPost;

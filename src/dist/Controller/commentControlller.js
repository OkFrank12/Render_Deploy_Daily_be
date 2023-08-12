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
exports.unVoteUserComment = exports.voteUserComment = exports.readOneComment = exports.readComment = exports.createComment = void 0;
const commentModel_1 = __importDefault(require("../Model/commentModel"));
const userModel_1 = __importDefault(require("../Model/userModel"));
const postModel_1 = __importDefault(require("../Model/postModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const mainError_1 = require("../error/mainError");
const likeModel_1 = __importDefault(require("../Model/likeModel"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, postID } = req.params;
        const { content } = req.body;
        const user = yield userModel_1.default.findById(userID);
        const post = yield postModel_1.default.findById(postID);
        if (post) {
            const comment = yield commentModel_1.default.create({
                content,
                userID,
            });
            post.comment.push(new mongoose_1.default.Types.ObjectId(comment._id));
            post.save();
            return res.status(mainError_1.HTTP.CREATE).json({
                message: "Created Comment",
                data: comment,
            });
        }
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Create Comment Error",
            message: "This Error came as a result of you creating this comment",
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({ message: "Error" });
    }
});
exports.createComment = createComment;
const readComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield commentModel_1.default.find().sort({ createdAt: -1 });
        return res.status(mainError_1.HTTP.OK).json({
            message: "Reading Comments",
            data: comment,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "read comment error",
            message: "This Error came as a result of you reading this comment",
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error",
        });
    }
});
exports.readComment = readComment;
const readOneComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentID } = req.params;
        const comment = yield commentModel_1.default.findById(commentID).populate({
            path: "post",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(mainError_1.HTTP.OK).json({
            message: "Reading one Comment",
            data: comment,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "reading one comment error",
            message: "This Error came as a result of you reading one comment",
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error",
        });
    }
});
exports.readOneComment = readOneComment;
const voteUserComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, commentID } = req.params;
        const comment = yield commentModel_1.default.findById(commentID);
        const user = yield userModel_1.default.findById(userID);
        const like = yield likeModel_1.default.create({
            userID,
            like: true,
        });
        comment.vote.push(new mongoose_1.default.Types.ObjectId(user._id));
        comment.save();
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "Vote User Comment",
            data: like,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Vote User Comment Error",
            message: `This Error came as a result of you voting a comment`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
        });
    }
});
exports.voteUserComment = voteUserComment;
const unVoteUserComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentID, userID, likeID } = req.params;
        const comment = yield commentModel_1.default.findById(commentID);
        const user = yield userModel_1.default.findById(userID);
        const like = yield likeModel_1.default.findById(likeID);
        const likes = yield likeModel_1.default.findByIdAndUpdate(likeID, {
            userID,
            like: false,
        }, { new: true });
        comment.vote.pull(new mongoose_1.default.Types.ObjectId(user._id));
        comment.save();
        return res.status(mainError_1.HTTP.BAD).json({
            message: "unvote user comment",
            data: likes,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Unvote user comment error",
            message: `This Error came as a result of you unvoting a comment`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({ message: "Error" });
    }
});
exports.unVoteUserComment = unVoteUserComment;
// export const 

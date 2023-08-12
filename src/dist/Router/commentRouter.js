"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentControlller_1 = require("../Controller/commentControlller");
const comment = (0, express_1.Router)();
comment.route("/:userID/:postID/create-comment").post(commentControlller_1.createComment);
comment.route("/get-all-comment").get(commentControlller_1.readComment);
comment.route("/:commentID/get-comment").get(commentControlller_1.readOneComment);
comment.route("/:userID/:commentID/vote-comment").post(commentControlller_1.voteUserComment);
comment
    .route("/:userID/:commentID/:likeID/unvote-comment")
    .post(commentControlller_1.unVoteUserComment);
exports.default = comment;

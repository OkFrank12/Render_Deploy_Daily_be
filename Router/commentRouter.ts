import { Router } from "express";
import {
  createComment,
  readComment,
  readOneComment,
  unVoteUserComment,
  voteUserComment,
} from "../Controller/commentControlller";

const comment: Router = Router();

comment.route("/:userID/:postID/create-comment").post(createComment);
comment.route("/get-all-comment").get(readComment);
comment.route("/:commentID/get-comment").get(readOneComment);
comment.route("/:userID/:commentID/vote-comment").post(voteUserComment);
comment
  .route("/:userID/:commentID/:likeID/unvote-comment")
  .post(unVoteUserComment);

export default comment;

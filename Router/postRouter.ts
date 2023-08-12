import { Router } from "express";
import { Image } from "../Config/multer";
import {
  createPost,
  readPost,
  readUsersPost,
  unVoteUserPost,
  viewVotedPost,
  voteUserPost,
} from "../Controller/postController";

const post: Router = Router();

post.route("/:userID/create-post").post(Image, createPost);
post.get("/get-all-post", readPost);
post.get("/:userID/get-post", readUsersPost);
post.route("/:userID/:postID/vote-post").post(voteUserPost)
post.route("/:userID/:postID/:likeID/unvote-post").post(unVoteUserPost)
post.route("/:postID/view-vote-post").get(viewVotedPost);

export default post;

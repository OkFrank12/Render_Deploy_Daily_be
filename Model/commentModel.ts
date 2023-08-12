import mongoose from "mongoose";

interface iComment {
  content?: string;
  userID?: string;
  vote?: {}[];
  reply?: {}[];
  post: {}[];
}

interface iCommentData extends iComment, mongoose.Document {}

const commentModel = new mongoose.Schema<iComment>(
  {
    content: {
      type: String,
    },
    userID: {
      type: String,
    },
    vote: [
      {
        type: mongoose.Types.ObjectId,
        ref: "likes",
      },
    ],
    reply: [
      {
        type: mongoose.Types.ObjectId,
        ref: "replys",
      },
    ],
    post: [
      {
        type: mongoose.Types.ObjectId,
        ref: "posts",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iCommentData>("comments", commentModel);

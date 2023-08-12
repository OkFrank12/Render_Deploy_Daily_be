import mongoose from "mongoose";

interface iPost {
  title?: string;
  content?: string;
  userID?: string;
  user?: {};
  image?: string;
  imageID?: string;
  vote?: {}[];
  bookMark?: Array<String>;
  comment?: Array<string>;
  tags?: Array<string>;
}

interface iPostData extends iPost, mongoose.Document {}

const postModel = new mongoose.Schema<iPost>(
  {
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
        type: mongoose.Types.ObjectId,
        ref: "likes",
      },
    ],
    tags: {
      type: Array<String>,
    },
    comment: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comments",
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iPostData>("posts", postModel);

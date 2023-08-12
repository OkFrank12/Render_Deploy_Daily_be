import mongoose from "mongoose";

interface iLike {
  userID?: string;
  like: boolean;
}

interface iLikeData extends iLike, mongoose.Document {}

const likeModel = new mongoose.Schema<iLike>(
  {
    userID: {
      type: String,
      default: false,
    },
    like: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iLikeData>("likes", likeModel);

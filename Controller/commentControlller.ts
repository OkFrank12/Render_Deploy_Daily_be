import { Request, Response } from "express";
import commentModel from "../Model/commentModel";
import userModel from "../Model/userModel";
import postModel from "../Model/postModel";
import mongoose from "mongoose";
import { HTTP, mainError } from "../error/mainError";
import likeModel from "../Model/likeModel";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userID, postID } = req.params;
    const { content } = req.body;
    const user: any = await userModel.findById(userID);
    const post: any = await postModel.findById(postID)

    if (post) {
      const comment = await commentModel.create({
        content,
        userID,
      });

      post.comment.push(new mongoose.Types.ObjectId(comment._id));
      post.save();

      return res.status(HTTP.CREATE).json({
        message: "Created Comment",
        data: comment,
      });
    }
  } catch (error) {
    new mainError({
      name: "Create Comment Error",
      message: "This Error came as a result of you creating this comment",
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({ message: "Error" });
  }
};

export const readComment = async (req: Request, res: Response) => {
  try {
    const comment = await commentModel.find().sort({ createdAt: -1 });

    return res.status(HTTP.OK).json({
      message: "Reading Comments",
      data: comment,
    });
  } catch (error) {
    new mainError({
      name: "read comment error",
      message: "This Error came as a result of you reading this comment",
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "Error",
    });
  }
};

export const readOneComment = async (req: Request, res: Response) => {
  try {
    const { commentID } = req.params;
    const comment: any = await commentModel.findById(commentID).populate({
      path: "post",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(HTTP.OK).json({
      message: "Reading one Comment",
      data: comment,
    });
  } catch (error) {
    new mainError({
      name: "reading one comment error",
      message: "This Error came as a result of you reading one comment",
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "Error",
    });
  }
};

export const voteUserComment = async (req: Request, res: Response) => {
  try {
    const { userID, commentID } = req.params;
    const comment: any = await commentModel.findById(commentID);
    const user: any = await userModel.findById(userID);
    const like = await likeModel.create({
      userID,
      like: true,
    });
    comment.vote.push(new mongoose.Types.ObjectId(user._id));
    comment.save();

    return res.status(HTTP.CREATE).json({
      message: "Vote User Comment",
      data: like,
    });
  } catch (error) {
    new mainError({
      name: "Vote User Comment Error",
      message: `This Error came as a result of you voting a comment`,
      status: HTTP.BAD,
      success: false,
    });
    return res.status(HTTP.BAD).json({
      message: "error",
    });
  }
};

export const unVoteUserComment = async (req: Request, res: Response) => {
  try {
    const { commentID, userID, likeID } = req.params;
    const comment: any = await commentModel.findById(commentID);
    const user: any = await userModel.findById(userID);
    const like: any = await likeModel.findById(likeID);
    const likes = await likeModel.findByIdAndUpdate(
      likeID,
      {
        userID,
        like: false,
      },
      { new: true }
    );
    comment.vote.pull(new mongoose.Types.ObjectId(user._id));
    comment.save();

    return res.status(HTTP.BAD).json({
      message: "unvote user comment",
      data: likes,
    });
  } catch (error) {
    new mainError({
      name: "Unvote user comment error",
      message: `This Error came as a result of you unvoting a comment`,
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({ message: "Error" });
  }
};

// export const 
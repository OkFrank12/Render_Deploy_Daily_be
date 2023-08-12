import { Request, Response } from "express";
import postModel from "../Model/postModel";
import { HTTP, mainError } from "../error/mainError";
import userModel from "../Model/userModel";
import cloudinary from "../Config/cloudinary";
import mongoose from "mongoose";
import likeModel from "../Model/likeModel";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { title, content } = req.body;

    const user: any = await userModel.findById(userID);

    if (user) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file?.path!
      );
      const post = await postModel.create({
        title,
        content,
        image: secure_url,
        imageID: public_id,
        userID,
        user,
      });

      user.post.push(new mongoose.Types.ObjectId(post._id));
      user.save();

      return res.status(HTTP.CREATE).json({
        message: "post created",
        data: post,
      });
    } else {
      return res.status(HTTP.BAD).json({
        message: "Error",
      });
    }
  } catch (error) {
    new mainError({
      name: "Creating Post Error",
      message: `This Error came as a result of you creating this post`,
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "Error",
    });
  }
};

export const readPost = async (req: Request, res: Response) => {
  try {
    const post = await postModel.find();

    return res.status(HTTP.OK).json({
      message: "Reading Post",
      data: post,
    });
  } catch (error) {
    new mainError({
      name: "Reading Post error",
      message: `This Error came as a result of you getting this post`,
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "Error",
    });
  }
};

export const readUsersPost = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user: any = await userModel.findById(userID).populate({
      path: "post",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(HTTP.OK).json({
      message: "Reading User Post",
      data: user,
    });
  } catch (error) {
    new mainError({
      name: "Reading Users Post error",
      message: `This Error came as a result of you getting user post`,
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "error",
    });
  }
};

export const voteUserPost = async (req: Request, res: Response) => {
  try {
    const { userID, postID } = req.params;
    const post: any = await postModel.findById(postID);
    const user: any = await userModel.findById(userID);
    const like = await likeModel.create({
      userID,
      like: true,
    });

    post?.vote?.push(new mongoose.Types.ObjectId(user._id));
    post?.save();

    return res.status(HTTP.CREATE).json({
      message: "Vote User Post",
      data: like,
    });
  } catch (error) {
    new mainError({
      name: "Vote User Post Error",
      message: `This Error came as a result of you voting this post`,
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "Error",
    });
  }
};

export const unVoteUserPost = async (req: Request, res: Response) => {
  try {
    const { userID, postID, likeID } = req.params;
    const post: any = await postModel.findById(postID);
    const user: any = await userModel.findById(userID);
    const like: any = await likeModel.findById(likeID);
    const likes: any = await likeModel.findByIdAndUpdate(
      likeID,
      {
        userID,
        like: false,
      },
      { new: true }
    );

    post?.vote?.pull(new mongoose.Types.ObjectId(user._id));
    post?.save();

    return res.status(HTTP.CREATE).json({
      message: "unVote User Post",
      data: likes,
    });
  } catch (error) {
    new mainError({
      name: "unVote User Post Error",
      message: `This Error came as a result of you unVote this post`,
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "Error",
    });
  }
};

export const viewVotedPost = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;
    const post: any = await postModel.findById(postID).populate({
      path: "vote",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(HTTP.OK).json({
      message: "view voted Post",
      data: post?.vote,
    });
  } catch (error) {
    new mainError({
      name: "view voted Post Error",
      message: `This Error came as a result of you viewing voted post`,
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "Error",
    });
  }
};

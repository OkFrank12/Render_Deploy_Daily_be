import { Request, Response } from "express";
import { HTTP, mainError } from "../error/mainError";
import bcrypt from "bcrypt";
import userModel from "../Model/userModel";
import cloudinary from "../Config/cloudinary";
import { validationResult } from "express-validator";

export const createUser = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password } = req.body;
     
      const salt: any = await bcrypt.genSalt(10);
      const hash: any = await bcrypt.hash(password, salt);

      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path
      );

      const user = await userModel.create({
        name,
        email,
        password: hash,
        avatar: secure_url,
        avatarID: public_id,
      });

      return res.status(HTTP.CREATE).json({
        message: "Created User",
        data: user,
      });
  } catch (error: any) {
    new mainError({
      name: "Route Error",
      message: `This Error came as a result of you creating this user`,
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const error = validationResult(req);

    // if (error) {
    //   return res.status(HTTP.BAD).json(error);
    // }
    const signIn = await userModel.findOne({ email });

    if (signIn) {
      const hash = await bcrypt.compare(password, signIn.password!);

      if (hash) {
        return res.status(HTTP.CREATE).json({
          message: `Welcome Back ${signIn.name}`,
          data: signIn._id,
        });
      } else {
        new mainError({
          name: "Invalid Password Error",
          message: `User Password is not correct`,
          status: HTTP.BAD,
          success: false,
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    new mainError({
      name: "Sign in Error",
      message: `This Error came as a result of you signing in`,
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "error",
    });
  }
};

export const readAllUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(HTTP.OK).json({
      message: "Reading all users",
      data: user,
    });
  } catch (error) {
    new mainError({
      name: "Reading All Users Error",
      message: `This Error came as a result of you getting all users`,
      status: HTTP.BAD,
      success: false,
    });
  }
};

export const readOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    return res.status(HTTP.OK).json({
      message: "Reading one users",
      data: user,
    });
  } catch (error) {
    new mainError({
      name: "Reading One User Error",
      message: `This Error came as a result of you getting one users`,
      status: HTTP.BAD,
      success: false,
    });
  }
};

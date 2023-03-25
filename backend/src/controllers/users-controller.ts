import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/user";
import UserModel from "../models/user";
import HttpError from '../models/http-error';
import jwt from "jsonwebtoken";

class UsersController{
  public static login = async (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body as IUser;
    // let user, token;
    try{
      const user = await UserModel.findOne({username, password}).exec();
      if(!user){
        return next(new HttpError('Invalid Credentials', 403));
      }
      //TODO decrypt the password and create a token
      // token = jwt.sign({
      //   userID: user.id
      // }, process.env.JWT_KEY as string, {expiresIn: '1h'});
    }catch(err){
      return next(new HttpError('Something went wrong, could not login', 500));
    }
    res.status(200).json({username});
  }
  public static signup = async (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body as IUser;
    try {
      const existingUser = await UserModel.findOne({username}).exec();
      if(existingUser){
        return next(new HttpError('Username already taken', 500));
      }
      //TODO Encrypt the password and create a token
      const user = new UserModel({
        username,
        password,
        // name,
        friends: [],
      });
      await user.save();
    } catch (error) {
      return next(new HttpError('Something went wrong could not sign up', 500));
    }
    res.status(201).json({username});
  }
  public static getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const {uid} = req.params;
    let friends;
    try{
      friends = await UserModel.find({
        username: {$ne: uid},
      }).select('username');
    }catch(err){
      return next(new HttpError('Something went wrong could not load users, try again later', 500))
    }
    res.json({users: friends});
  }
  private static createToken = (id: string) => {
    const token = jwt.sign({
        userID: id
      }, process.env.JWT_KEY as string, {expiresIn: '1h'});
    return token;
  }
}

export default UsersController;
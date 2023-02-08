import { NextFunction, Request, Response } from "express";
import { User } from "../interfaces/user";
import UserModel from "../models/user";
import HttpError from '../models/http-error';
import jwt from "jsonwebtoken";

class UsersController{
  static login = async (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body as User;
    // let user, token;
    try{
      const user = await UserModel.findOne({username, password}).exec();
      if(!user){
        return next(new HttpError('Invalid Credentials', 403));
      }
      //TODO decrypt the password
      // token = jwt.sign({
      //   userID: user.id
      // }, process.env.JWT_KEY as string, {expiresIn: '1h'});
    }catch(err){
      return next(new HttpError('Something went wrong, could not login', 500));
    }
    res.status(200).json({username});
  }
  static signup = async (req: Request, res: Response, next: NextFunction) => {
    const {username, password, name} = req.body as User;
    try {
      const existingUser = await UserModel.findOne({username}).exec();
      if(existingUser){
        return next(new HttpError('Username already taken', 500));
      }
      
      const user = new UserModel({
        username,
        password,
        name,
        friends: [],
      });
      await user.save();
    } catch (error) {
        return next(new HttpError('Something went wromg could not sign up', 500));
    }
    res.status(201).json({username});
  }
}

export default UsersController;
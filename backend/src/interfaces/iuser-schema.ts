import { Document, Types } from "mongoose";

export default interface IUserSchema extends Document{
  username: string,
  password: string,
  friends: Types.ObjectId[],
  //TODO add other fields like: name, image...etc
}
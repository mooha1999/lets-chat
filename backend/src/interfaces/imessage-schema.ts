import { Types } from "mongoose";

export default interface IMessageSchema{
  sender: Types.ObjectId,
  recipient: Types.ObjectId,
  content: string,//TODO Modify to accept multimedia files
  timestamp: Date,
}
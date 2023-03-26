import { Document } from "mongoose";
import IMessage from "./imessage-schema";

export default interface IRoomSchema extends Document{
  key: string,
  messages: IMessage[]
}
import { model, Schema } from "mongoose";
import IMessageSchema from "../interfaces/imessage-schema";
import IRoomSchema from "../interfaces/iroom-schema";

const messageSchema = new Schema<IMessageSchema>({
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  recipient: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true },
}, { _id: false })

const roomSchema = new Schema<IRoomSchema>({
  key: { type: String, required: true, unique: true },
  messages: [{ type: messageSchema, required: true }],
});

export default model("Room", roomSchema);
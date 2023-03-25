import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  type: {type: String, required: true},
  message: {type: Object, required: true},
  time: {type: Date, required: true},
})

const roomSchema = new Schema({
  roomID: {type: String, required: true, unique: true},
  message: {type: messageSchema, required: true},
});

export default model("Room", roomSchema);
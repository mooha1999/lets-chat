import { model, Schema } from "mongoose";

const deviceSchema = new Schema({
  name: {type: String, required: true},
  password: {type: String, required: true, minLength: 6}
});

module.exports = model("Device", deviceSchema);
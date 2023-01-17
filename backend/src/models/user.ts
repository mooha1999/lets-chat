import { model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, minLength: 6},
  // devices: [{type: mongoose.Types.ObjectId, required: true, ref: "Device"}],
});
//This plugin queries the email faster and makes sure no 2 identical emails are created
userSchema.plugin(mongooseUniqueValidator);
// This tells mongoose to create a new collection with the given schema
//! When 'User' is passed as an argument the name of the collection will be 'users' 
export default model("User", userSchema);
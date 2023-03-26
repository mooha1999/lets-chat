import { model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import IUserSchema from "../interfaces/iuser-schema";

const userSchema = new Schema<IUserSchema>({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, minLength: 6},
  friends: [{type: Schema.Types.ObjectId, required: true, ref: "User"}],
  //TODO add other fields like: name, image...etc
});
//This plugin queries the email faster and makes sure no 2 identical emails are created
userSchema.plugin(mongooseUniqueValidator);
// This tells mongoose to create a new collection with the given schema
//! When 'User' is passed as an argument the name of the collection will be 'users' 
export default model("User", userSchema);
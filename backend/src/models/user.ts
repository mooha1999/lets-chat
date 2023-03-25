import { model, Schema, Types } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, minLength: 6},
  friends: [{type: Types.ObjectId, required: true, ref: "User"}],
});
  // rooms: [{type: Types.ObjectId, required: true, ref: "Room"}],
  // name: {type: String, required: true},
//This plugin queries the email faster and makes sure no 2 identical emails are created
userSchema.plugin(mongooseUniqueValidator);
// This tells mongoose to create a new collection with the given schema
//! When 'User' is passed as an argument the name of the collection will be 'users' 
export default model("User", userSchema);
/*
#I have a graph, the graph is a representation of 
Each user has a friend list
Generate the list using the user's ID
FROM SQL POINT OF VIEW
There is a table holding all users' data called USERS
There is aslo a table consisting of 2 columns each column is a foreign key but together they form a composite primary key. The table is called FRIENDS
FROM NoSQL POINT OF VIEW
There is a collection called USERS holding all the users' data. There is a field called FRIENDS. It is an array of ObjectIDs that are later populated.	
*/
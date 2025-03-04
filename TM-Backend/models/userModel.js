import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    default: uuidv4, 
    unique: true, 
  },
  name: {
    type: String,
    required: true, //name of the user who will log in /sign up
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true, //his email
  },
  password: {
    type: String,
    required: true, //password
  },
  tasksAssigned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  resetToken: {
    type: String,
    default: null, //this is for resting the password
  },
  role: {
    type: String,
    enum: ["user"],
    default: "user", // Normal users are assigned "user" role
  },
  resetTokenExpiry: {
    type: Date,
    default: null, //this is for resting the password expiration
  },
  isEmailVerified: {
    type: Boolean,
    default: false, // this is for email verification see if user verified the email or not
  },
},{timestamps:true});


const Users = mongoose.model("users",userSchema);
export default Users;
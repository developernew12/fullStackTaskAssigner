import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true, //username which we will give
    },
    password: {
      type: String,
      required: true, // password which we will set (manger)
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin", 
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;

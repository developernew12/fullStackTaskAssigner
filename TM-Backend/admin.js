import readLine from 'readline';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import Admin from "./models/adminModel.js";
import bcrypt from "bcrypt";

dotenv.config();
mongoose.connect(process.env.MONGODBURL);
console.log("MongoDB URL:", process.env.MONGODBURL);

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter The Admin Username: ",(username)=>{
    rl.question("Enter Password: ",async(password)=> {
      try {
        const hashPassword = await bcrypt.hash(password,10);
        const newAdmin = new Admin({
            username:username,
            password:hashPassword
        });
        await newAdmin.save();
        console.log(`Admin ${username} Created Successfully`);
      } catch (error) {
        console.log("Error Creating Admin",error);
      }
      mongoose.connection.close();
      rl.close();
    });
});
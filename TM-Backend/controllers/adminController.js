import express from "express";
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../models/userModel.js";
import Task from "../models/taskModel.js";

export async function login(req, res) {
  const { username, password } = req.body;
  console.log("adminLogin",req.body);
  
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
     return res.status(401).send({ message: "Inavlid Username or Password" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(401).send({ message: "Inavlid Username or Password" });
    }
    const generateToken = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.cookie("adminToken", generateToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "None",
      
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).send({
      message: "Login Successful",
      admin: {
        _id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}
export const logOut = (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });
  res.status(200).send({ message: "Logged out successfully" });
};
export async function getAllUsersWithTasks(req, res) {
    try {
        const users = await Users.find().select("-password"); 

        const usersWithTasks = await Promise.all(users.map(async (user) => {
            const tasks = await Task.find({ assignedTo: user._id }).populate("assignedBy", "name email");
            return { user, tasks };
        }));

        res.status(200).json(usersWithTasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users and tasks", error });
    }
}
export const verifyAdmin = async (req, res) => {
    try {
      console.log("This if from the adminController",req.cookies.adminToken);
      
        const token = req.cookies.adminToken;
        if (!token) return res.status(401).send({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const user = await Users.findById(decoded.userId).select("-password");
        const admin = await Admin.findById(decoded.id).select("-password");
        console.log(admin);
        
        if (!admin) return res.status(404).send({ message: "admin not found" });
        res.status(200).send({message:"User Verified",  admin: {
          // _id: user._id,
          _id: admin._id, 
      
          username:admin.username,
          role:admin.role,
        } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.log(error);
        
    }
};
export const getAdminDashBoard = async (req,res) => {
  try {
    const totalUsers = await Users.countDocuments();
    const totalTasks = await Task.countDocuments();
    const ongoingTasks = await Task.countDocuments({ status:{ $ne: "Completed" } });
    const completedTasks = await Task.countDocuments({ status: "Completed"});

    res.status(200).send({
      totalUsers,
      totalTasks,
      ongoingTasks,
      completedTasks
    });
  } catch (error) {
    res.status(500).send({message:"Error fetching admin dashboard data",error});
  }
};
export const getAllTasks = async (req,res) => {
  try {
    const tasks = await Task.find()
    .populate("assignedTo","name email")
    .populate("assignedBy","username")
    .select("title status deadline assignedTo extensionRequested extensionReason");

    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({message:"error fetching tasks",error});
  }
}
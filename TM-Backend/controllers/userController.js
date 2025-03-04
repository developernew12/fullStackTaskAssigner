import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import "dotenv/config";
import { sendVerificationEmail } from "../middlewares/emailVerification.js";

export async function register (req,res) {
  const {name,email} = req.body;
  console.log(req.body);
  
  try {
    const lowerName = name.toLowerCase();
    const lowerEmail = email.toLowerCase();
    
    //see this is for if user is already exists and verified
    const existingEmail = await Users.findOne({email:lowerEmail});
    if(existingEmail && existingEmail.isEmailVerified === true){
      return res.status(400).send({message:`Email: ${lowerEmail} Already Exists`});
    }

    //if user has requested for the email verification but not verified yet.can use same email
    if(existingEmail && existingEmail.isEmailVerified === false){
      existingEmail.name = lowerName;
      existingEmail.password = await bcrypt.hash(req.body.password,10);
      existingEmail.resetToken = null;
      existingEmail.resetTokenExpiry = null;
      await existingEmail.save();   
          await sendVerificationEmail(lowerEmail,lowerName);
      return res.status(200).send({message: "Verification email resent. Please verify your account."});
    }

    //this is for new user with new email
    const hashPassword = await bcrypt.hash(req.body.password,10);
    const newUser = new Users({
      name:lowerName,
      email:lowerEmail,
      password:hashPassword
    });
    await newUser.save();

    //this is for sending the email verification
    await sendVerificationEmail(lowerEmail, lowerName); 
    return res.status(200).send({message: "Verification email sent. Please verify your account."});
  } catch (error) {
    res.status(500).send({ message: "Server error",error });
    console.log(error);
    
  }
}

export async function login(req,res) {
//  console.log(req.body);
 const {email,password} = req.body;
 try {
   const user = await Users.findOne({email:email});
   if(!user){
     return res.status(401).send({message:"Invalid Email or Password"});
   }
   if(user.isEmailVerified === false){
     return res.status(401).send({message:"Please verify your email to login"});
   }
   const isPasswordMatch = await bcrypt.compare(password,user.password);
   if(!isPasswordMatch){
     return res.status(401).send({message:"Invalid Email or Password"});
   }
   const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
   );
   res.cookie("token",token,{
      httpOnly:true,
      secure: process.env.NODE_ENV === "production",
      sameSite:"None",
      domain: process.env.NODE_ENV === "development" ? "localhost" : "hkmhmghmgt",
      maxAge: 24 * 60 * 60 * 1000,
   });
   return res.status(200).send({message:"Login Successful",user: {
    _id: user._id, 
    name: user.name,
    email: user.email,
    role:user.role,
  }});
   
 } catch (error) {
  
 }
}
// This is for Verify User Function
export const verifyUser = async (req, res) => {
    try {
      console.log(req.cookies.token);
      
        const token = req.cookies.token;
        if (!token) return res.status(401).send({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const user = await Users.findById(decoded.userId).select("-password");
        const user = await Users.findById(decoded.userId).select("-password");
        console.log(user);
        
        if (!user) return res.status(404).send({ message: "User not found" });
        res.status(200).json({message:"User Verified",  user: {
          // _id: user._id,
          _id: user._id, 
          name: user.name,
          email: user.email,
        } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.log(error);
        
    }
};

// This is for LogOut Function
export const logOut = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
    });
    res.status(200).send({ message: "Logged out successfully" });
};

export async function resetPasswordRequest(req, res) {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email});
    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    } 
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; 
    await user.save();
    const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken}`;
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2>Password Reset Request</h2>
          <p>Click the link below to reset your password. The link will expire in 15 minutes:</p>
          <a href="${resetLink}" style="background:rgb(0, 0, 0); color: white; padding: 10px 20px; text-decoration: none;">
            Reset Password
          </a>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Password reset link sent to your email" });
  } catch (error) {
    res.status(500).send({ message: "Error sending password reset email", error });
  }
}

export async function resetPassword(req, res) {
  const {token,newPassword} = req.body;
  console.log(token,newPassword);
  
  try {
    if(!token) {
      return res.status(401).send({message:"Token Not Found"});
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await Users.findOne({email:decoded.email,resetToken:token,resetTokenExpiry:{$gt:Date.now()}});
    if (!user) {
      return res.status(400).send({ message: "Invalid or expired token" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).send({ message: "Token expired" });
    }
    res.status(500).send({ message: "Error resetting password", error });
    console.log(error);
  }
}

export async function getUserTasks(req, res) {
  // console.log("triggered",req.user._id);
  
  try {
      const user = await Users.findById(req.user._id)
          .populate({
              path: "tasksAssigned",
              populate: { path: "assignedBy", select: "name email" }
          });
       console.log(user,"The mAIn User");
       
      if (!user || user.tasksAssigned.length === 0) {
          return res.status(404).send({ message: "No tasks assigned to this user." });
      }

      res.status(200).send({ tasks: user.tasksAssigned });
  } catch (error) {
      res.status(500).send({ message: "Error fetching tasks", error });
  }
}
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import  "dotenv/config";

const createEmailTransporter = () => {
    return nodemailer.createTransport({
      service: "gmail",
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD,
      },
});
}

export const sendVerificationEmail = async (email,name) => {
    const transporter = createEmailTransporter();
    const verificationLink = `${process.env.BASE_URL}/verify-email?token=${verificationToken(email)}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: #f9f9f9;">
       <h2 style="color:rgb(0, 0, 0); text-align: center;">Welcome! Verify Your Email</h2>
       <p style="font-size: 16px;">
      Hello <strong>${name}</strong>,
       </p>
      <p style="font-size: 16px;">
      Thank you for registering on our platform. Please verify your email address to activate your account and enjoy our full services.
      </p>
     <div style="text-align: center; margin: 30px 0;">
      <a href="${verificationLink}" style="background:rgb(0, 0, 0); color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
        Verify Email Now
      </a>
      </div>
     </div>
     `,
      };
      await transporter.sendMail(mailOptions);
}

export const verificationToken = (userEmail) => {
    return jwt.sign({ email: userEmail }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
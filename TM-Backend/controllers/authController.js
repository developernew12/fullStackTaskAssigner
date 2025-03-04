import "dotenv/config";
import jwt from "jsonwebtoken";
import Users from "./../models/userModel.js";


export async function verifyTokenForEmail(req, res) {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findOneAndUpdate(
            { email: decoded.email },
            { isEmailVerified: true },
            { new: true }
        );
        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        } else {
            return res.status(200).send({ message: "User Verified Successfully" });
        }
    } catch (error) {
        console.log(error);
        
    }
}
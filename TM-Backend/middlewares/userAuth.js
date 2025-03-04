import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
export const verifyUsery = async (req, res, next) => {
    try {
        console.log("Cookies:", req.cookies); 

        const token = req.cookies.token;
        if (!token) {
            console.log("No token found!");
            return res.status(401).json({ message: "Unauthorized - No token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded :", decoded);

        const user = await Users.findById(decoded.userId).select("-password");
        console.log("User Found:", user);

        if (!user) {
            console.log("User not found in database!");
            return res.status(404).json({ message: "User not found" });
        }

     
        req.user = user;
        console.log("req.user set:", req.user);

        next(); 
    } catch (error) {
        console.error("Auth Error:", error);
        res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
};

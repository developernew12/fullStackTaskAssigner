import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';

export async function adminAuth(req,res,next){
    console.log("adminAuth");
    
    try {
        const token = req.cookies.adminToken;
        console.log("token from admin idd",token);
        
        if(!token){
          return  res.status(401).send({message:"Not Authorized"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
         const admin = await Admin.findById(decoded.id).select("-password");

        if(!admin){
            return res.status(401).send({message:"Admin not found"});
        }
        // next();
        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).send({message:"Token verification failed"});
    }
};

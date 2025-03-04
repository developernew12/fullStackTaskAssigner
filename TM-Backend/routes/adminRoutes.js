import express from 'express';
import { getAllUsersWithTasks, login } from '../controllers/adminController.js';
import { adminAuth } from '../middlewares/adminAuthMidd.js';
import { logOut } from '../controllers/adminController.js';


const adminRouter = express.Router();

adminRouter.post("/login",login);
adminRouter.post("/logout",logOut);
adminRouter.get("/verify-user",adminAuth);
adminRouter.get("/users-tasks", adminAuth, getAllUsersWithTasks);
// adminRouter.get("/dashboard",adminAuth,(req,res)=>{
//     res.send({message:"Welcome, Admin",admin: req.admin});
// })

export default adminRouter;
import express from 'express';
import { getAdminAssignedTasks, getAdminDashBoard, getAllUsers, getAllUsersWithTasks, login, verifyAdmin } from '../controllers/adminController.js';
import { adminAuth } from '../middlewares/adminAuthMidd.js';
import { logOut } from '../controllers/adminController.js';
import { cancelMeeting, createMeeting, getAllMeetings, startMeeting } from '../controllers/meetingController.js';


const adminRouter = express.Router();

adminRouter.post("/login",login);
adminRouter.post("/logout",logOut);
adminRouter.get("/verify-user",adminAuth,verifyAdmin);
adminRouter.get("/users-tasks", adminAuth, getAllUsersWithTasks);
adminRouter.get("/dashboard",adminAuth,getAdminDashBoard);
// adminRouter.get("/dashboard",adminAuth,(req,res)=>{
//     res.send({message:"Welcome, Admin",admin: req.admin});
// })
adminRouter.get("/all-users",adminAuth,getAllUsers);
adminRouter.get("/assigned-tasks", adminAuth, getAdminAssignedTasks);
adminRouter.post("/create-meeting",adminAuth,createMeeting);
adminRouter.post("/start-meeting/:id", adminAuth, startMeeting);
adminRouter.get("/meetings", adminAuth, getAllMeetings);
adminRouter.post("/cancel-meeting/:id", adminAuth, cancelMeeting);

export default adminRouter;
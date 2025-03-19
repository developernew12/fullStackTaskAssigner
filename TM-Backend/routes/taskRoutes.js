import express from "express";
import { adminAuth } from "../middlewares/adminAuthMidd.js";
import { verifyUsery } from "../middlewares/userAuth.js";
import {
  approveDeadlineExtension,
  createTask,
  getAllExtensionRequests,
  getAllTasks,
  getSpecificTask,
  requestDeadlineExtension,
  updateTaskStatus,
} from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.post("/create", adminAuth, createTask);
taskRouter.put("/update/status/:taskId", verifyUsery, updateTaskStatus);
taskRouter.post(
  "/request-extension/:taskId",
  verifyUsery,
  requestDeadlineExtension
);
taskRouter.get("/extension-requests", adminAuth, getAllExtensionRequests);
taskRouter.post(
  "/approve-extension/:taskId",
  adminAuth,
  approveDeadlineExtension
);
taskRouter.get('/all-tasks',adminAuth,getAllTasks);
taskRouter.get("/:id",verifyUsery,getSpecificTask);
export default taskRouter;

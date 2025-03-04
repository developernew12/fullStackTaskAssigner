import express from "express";
import {  verifyTokenForEmail } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/verify-token",verifyTokenForEmail);

export default authRouter;
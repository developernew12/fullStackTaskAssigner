import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { startServer } from "./connection/DB.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import "./utils/taskScheduler.js";

const app = express();
const PORT = process.env.PORT || 4000;
const corsOptions = {
    origin:["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"], 
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/task/",taskRouter);

startServer();
app.listen(PORT, () => console.log(`Server started at Port ${PORT}`));

//Today i made two routes one for user register and after registration the user will recieve and verification email where they can verify there email also that will reflect in there database

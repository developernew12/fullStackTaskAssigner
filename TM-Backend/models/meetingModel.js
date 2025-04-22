import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const meetingSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    password: {
      type: String,
      default: () => crypto.randomBytes(4).toString("hex"),
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    assignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    topic: {
      type: String,
      required: true,
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    isCancelled: {
        type: Boolean,
        default: false,
      }
      
  },
  { timestamps: true }
);

const Meeting = mongoose.model("Meeting", meetingSchema);
export default Meeting;

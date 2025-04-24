import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
    },
    assignedTo: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    }],
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Not Done"],
      default: "Pending",
    },
    deadline: {
      type: Date,
      required: true,
    },
    extensionRequested: {
      type: Boolean,
      default: false,
    },
    extensionReason: {
      type: String,
      trim: true,
      default: "",
    },
    newDeadLine: {
      type: Date,
      default: null,
    },
    extensionApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;

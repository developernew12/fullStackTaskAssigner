import Task from "../models/taskModel.js";
import Users from "../models/userModel.js";

export async function createTask(req, res) {
    console.log("task requested received");
  
    try {
      const { title, description, deadline, assignedTo } = req.body;
  
      if (!title || !description || !deadline || !assignedTo || assignedTo.length === 0) {
        return res.status(400).send({ message: "All fields are required" });
      }
  
      const now = new Date();
      const taskDeadline = new Date(deadline);
      if (taskDeadline < now) {
        return res.status(400).send({ message: "Deadline must be in the future" });
      }
  
      const task = new Task({
        title,
        description,
        deadline,
        assignedTo,
        assignedBy: req.admin._id,
      });
  
      await task.save();
  
      await Promise.all(
        assignedTo.map(async (userId) => {
          const user = await Users.findById(userId);
          if (user) {
            user.tasksAssigned.push(task._id);
            await user.save();
          }
        })
      );
  
      res.status(201).send({ message: "Task created successfully", task });
  
    } catch (error) {
      console.error("Backend Error:", error);
      res.status(500).send({ message: "Error creating the task", error });
    }
  }
  

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).send({ message: "status is Required" });
    }

    const allowedStatuses = ["Pending", "In Progress", "Completed", "Not Done"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).send({ message: "Invalid status value" });
    }
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const now = new Date();

    if (task.deadline < now && !task.extensionApproved) {
      return res
        .status(403)
        .send({ success: false, message: "Deadline passed." });
    }
    //   task.status = status;
    //   await task.save();
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { status },
      { new: true }
    );
    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Task status updated",
        task: updatedTask,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
export const requestDeadlineExtension = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { newDeadline, reason } = req.body;
    const userId = req.user._id;

    if (!newDeadline || !reason) {
      return res.status(400).send({ message: "Deadline and reason required" });
    }

    if (isNaN(Date.parse(newDeadline))) {
      return res.status(400).send({ message: "Invalid date format" });
    }

    const task = await Task.findById(taskId).populate(
      "assignedTo",
      "name email"
    );

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    const now = new Date();
    if (task.deadline < now) {
      return res
        .status(403)
        .send({ message: "Cannot request extension after the deadline" });
    }

    if (new Date(newDeadline) <= now) {
      return res
        .status(400)
        .send({ message: "New deadline must be a future date" });
    }
    console.log("🔹 Received newDeadline:", newDeadline);
    console.log("🔹 Parsed newDeadline:", new Date(newDeadline));

    task.extensionRequested = true;
    task.newDeadLine = new Date(newDeadline);
    task.extensionReason = reason;

    await task.save();
    console.log("✅ Task Updated in Database:", task);
    res.status(200).send({
      message: "Deadline extension requested",
      task: {
        _id: task._id,
        title: task.title,
        requestedBy: {
          name: task.assignedTo.name,
          email: task.assignedTo.email,
        },
        reason: task.extensionReason,
        newDeadline: task.newDeadLine,
      },
    });
  } catch (error) {
    console.error("Error in requestDeadlineExtension:", error);
    res.status(500).send({ message: "Error requesting extension", error });
  }
};
export const approveDeadlineExtension = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { approved, newDeadline } = req.body;

    if (typeof approved !== "boolean") {
      return res
        .status(400)
        .send({ message: "Approval status (true/false) is required" });
    }

    const task = await Task.findById(taskId).populate(
      "assignedTo",
      "name email"
    );
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    if (!task.extensionRequested) {
      return res
        .status(400)
        .send({ message: "No extension request found for this task" });
    }

    if (approved) {
      if (!newDeadline || isNaN(Date.parse(newDeadline))) {
        return res
          .status(400)
          .send({ message: "Valid new dealine is required" });
      }

      const now = new Date();
      if (new Date(newDeadline) <= now) {
        return re
          .status(400)
          .send({ message: "New deadline must be a future date" });
      }
      task.deadline = new Date(newDeadline);
      task.extensionApproved = true;
    } else {
      task.extensionApproved = false;
    }
    task.extensionRequested = false;
    // task.newDeadline = null;
    await task.save();

    res.status(200).send({
      message: `Extension ${approved ? "approved" : "rejected"}`,
      task: {
        _id: task._id,
        title: task.title,
        assignedTo: {
          name: task.assignedTo.name,
          email: task.assignedTo.email,
        },
        extensionApproved: task.extensionApproved,
        deadline: task.deadline,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "Error approving extension", error });
  }
};
export const getAllExtensionRequests = async (req, res) => {
  console.log("trigre");

  try {
    const pendingRequests = await Task.find({ extensionRequested: true })
      .populate("assignedTo", "name email")
      .select("title extensionReason newDeadLine assignedTo deadline");

    // if (pendingRequests.length === 0) {
    //     return res.status(200).send({ message: "No pending extension requests" });
    // }

    res.status(200).send({ extensionRequests: pendingRequests });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching extension requests", error });
  }
};
export const getAllTasks = async (req, res) => {
  try {
    const totalTasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("assignedBy", "username")
      .select("title status deadline assignedTo assignedBy");
    res.status(200).send(totalTasks);
  } catch (error) {
    res.status(500).send({ message: "Error fetching tasks", error });
  }
};

export const getSpecificTask = async (req, res) => {
  console.log("SPECIFIC================", req);

  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.send(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).send({ message: "Task Not Found" });
    }
    await Task.findByIdAndDelete(taskId);
    res.status(200).send({ message: "Task deleted Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting task", error });
  }
};

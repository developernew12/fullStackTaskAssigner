
import Meeting from "../models/meetingModel.js";
import Users from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js"; 

export const createMeeting = async (req, res) => {
  try {
    const { topic, scheduledAt, assignedUsers } = req.body;

    const newMeeting = new Meeting({
      topic,
      scheduledAt,
      assignedUsers,
      createdBy: req.admin._id,
    });

    await newMeeting.save();

    // Fetch users' emails
    const users = await Users.find({ _id: { $in: assignedUsers } });

    for (const user of users) {
      await sendEmail({
        to: user.email,
        subject: "Meeting Scheduled",
        html: `<p>You have been invited to a meeting on "${topic}".</p>
               <p>Room ID: ${newMeeting.roomId}</p>
               <p>Password: ${newMeeting.password}</p>
               <p>Date/Time: ${new Date(scheduledAt).toLocaleString()}</p>`,
      });
    }

    res.status(201).json({
      message: "Meeting created and invitations sent.",
      meeting: newMeeting,
    });
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ error: "Failed to create meeting." });
  }
};
export const getUserMeetings = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const meetings = await Meeting.find({ assignedUsers: userId })
        .sort({ scheduledAt: 1 })
        .select("topic roomId password scheduledAt isLive isCancelled"); // ✅ include these
  
      res.status(200).json({ meetings });
    } catch (error) {
      console.error("Error fetching user meetings:", error);
      res.status(500).json({ error: "Failed to fetch meetings." });
    }
  };
  
export const startMeeting = async (req, res) => {
    try {
      const meetingId = req.params.id;
      const meeting = await Meeting.findById(meetingId);
  
      if (!meeting) return res.status(404).json({ error: "Meeting not found" });
  
      meeting.isLive = true;
      await meeting.save();
  
      // Optionally: emit WebSocket event like "meetingStarted" here
  
      res.json({ message: "Meeting is now live", meeting });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Could not start meeting" });
    }
  };
  export const getAllMeetings = async (req, res) => {
    try {
      const meetings = await Meeting.find({})
        .populate("assignedUsers", "name email") // show user info
        .sort({ scheduledAt: -1 });
  
      res.json({ meetings });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch meetings" });
    }
  };  
  export const cancelMeeting = async (req, res) => {
    try {
    //   const meeting = await Meeting.findById(req.params.id);
    //   if (!meeting) return res.status(404).json({ error: "Meeting not found" });
      const meeting = await Meeting.findByIdAndDelete(req.params.id);
    //   meeting.isCancelled = true;
      
    //   await meeting.save();
      
  
      // Optional: notify assigned users via email or socket
  
      res.json({ message: "Meeting has been cancelled." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to cancel meeting." });
    }
  };
  
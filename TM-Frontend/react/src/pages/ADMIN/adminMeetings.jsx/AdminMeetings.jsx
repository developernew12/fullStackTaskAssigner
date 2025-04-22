import React, { useContext, useEffect, useState } from "react";
import instance from "../../../services/axiosInstance";
import { AdminContext } from "../../../context/AdminContext";
import styles from "./adminMeeting.module.css";
const AdminMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const { darkMode, setDarkMode } = useContext(AdminContext);
  const fetchMeetings = async () => {
    try {
      const res = await instance.get("/admin/meetings");
      setMeetings(res.data.meetings);
    } catch (err) {
      console.error("Error fetching admin meetings", err);
    }
  };

  const handleStartMeeting = async (id) => {
    try {
      await instance.post(`/admin/start-meeting/${id}`);
      fetchMeetings(); // refresh list after update
    } catch (err) {
      console.error("Error starting meeting", err);
    }
  };
  const handleCancelMeeting = async (id) => {
    try {
      await instance.post(`/admin/cancel-meeting/${id}`);
      fetchMeetings(); // refresh UI
    } catch (err) {
      console.error("Error cancelling meeting", err);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div className={`${darkMode ? styles.darkContainer : styles.mainContainer}`}>
      <h2>All Scheduled Meetings</h2>
      {meetings.length === 0 ? (
        <p>No meetings created.</p>
      ) : (
        <ul>
          {meetings.map((meeting) => (
            <li key={meeting._id} style={{ marginBottom: "1.5rem" }}>
              <strong>{meeting.topic}</strong>
              <br />
              Room ID: {meeting.roomId}
              <br />
              Password: {meeting.password}
              <br />
              Users: {meeting.assignedUsers.map((u) => u.name).join(", ")}
              <br />
              Time: {new Date(meeting.scheduledAt).toLocaleString()}
              <br />
              {/* Show status with priority: cancelled > live > not started */}
              {meeting.isCancelled ? (
                <span style={{ color: "red" }}>❌ Cancelled</span>
              ) : meeting.isLive ? (
                <span style={{ color: "limegreen" }}>🟢 Live</span>
              ) : (
                <span style={{ color: "orange" }}>⏳ Not Started</span>
              )}
              <br />
              <br />
              {/* Hide all action buttons if meeting is cancelled */}
              {!meeting.isCancelled && (
                <>
                  <button onClick={() => handleStartMeeting(meeting._id)}>
                    Start
                  </button>
                  <button
                    onClick={() => handleCancelMeeting(meeting._id)}
                    style={{
                      marginLeft: "10px",
                      background: "red",
                      color: "white",
                    }}
                  >
                    ❌ Cancel
                  </button>
                </>
              )}
              {/* Still allow "Open Jitsi" even if cancelled (optional) */}
              <a
                href={`https://meet.jit.si/${meeting.roomId}`}
                target="_blank"
                rel="noreferrer"
                style={{ marginLeft: "10px" }}
              >
                🔗 Open Jitsi
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminMeetings;

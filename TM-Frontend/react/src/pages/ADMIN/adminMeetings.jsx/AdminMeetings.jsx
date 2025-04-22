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
        <div className={styles.gridContainer}>
  {meetings.map((meeting) => (
    <div key={meeting._id} className={styles.meetingCard}>
      <h3 className={styles.topic}>{meeting.topic}</h3>
      <p><strong>Room ID:</strong> {meeting.roomId}</p>
      <p><strong>Password:</strong> {meeting.password}</p>
      <p><strong>Users:</strong> {meeting.assignedUsers.map((u) => u.name).join(", ")}</p>
      <p><strong>Time:</strong> {new Date(meeting.scheduledAt).toLocaleString()}</p>

      <div className={styles.status}>
        {meeting.isCancelled ? (
          <span className={styles.cancelled}>❌ Cancelled</span>
        ) : meeting.isLive ? (
          <span className={styles.live}>🟢 Live</span>
        ) : (
          <span className={styles.pending}>⏳ Not Started</span>
        )}
      </div>

      <div className={styles.actions}>
        {!meeting.isCancelled && (
          <>
            <button
              className={styles.startBtn}
              onClick={() => handleStartMeeting(meeting._id)}
            >
              Start
            </button>
            <button
              className={styles.cancelBtn}
              onClick={() => handleCancelMeeting(meeting._id)}
            >
              ❌ Cancel
            </button>
          </>
        )}
        <a
          href={`https://meet.jit.si/${meeting.roomId}`}
          target="_blank"
          rel="noreferrer"
          className={styles.jitsiBtn}
        >
          🔗 Open Jitsi
        </a>
      </div>
    </div>
  ))}
</div>

      )}
    </div>
  );
};

export default AdminMeetings;

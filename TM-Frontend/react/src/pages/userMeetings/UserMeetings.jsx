import React, { useContext, useEffect, useState } from "react";
import instance from "../../services/axiosInstance";
import styles from "./usermeeting.module.css"
import { AdminContext } from "../../context/AdminContext";

const UserMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const {darkMode} = useContext(AdminContext);
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await instance.get("/user/meetings");
        setMeetings(res.data.meetings);
        console.log("Fetched meetings:", res.data.meetings);
        
      } catch (err) {
        console.error("Error fetching meetings", err);
      }
    };

    fetchMeetings();
  }, []);
  
  return (
    <div className={`${styles.MainContainer} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.heading2}>
      <h2 >Your Upcoming Meetings</h2>
      </div>

    {meetings.length === 0 ? (
      <p>No meetings assigned.</p>
    ) : (
      <ul className={styles.meetingList}>
        {meetings.map((meeting) => (
          <li
            key={meeting._id}
            className={`${styles.meetingItem} ${meeting.isCancelled ? styles.cancelled : ""}`}
          >
            <strong className={styles.topic}>{meeting.topic}</strong>
            <br />
            Room ID: {meeting.roomId}
            <br />
            Password: {meeting.password}
            <br />
            Time: {new Date(meeting.scheduledAt).toLocaleString()}
            <br />
            <br />
            {meeting.isCancelled ? (
              <span className={styles.cancelledText}>This meeting has been cancelled</span>
            ) : meeting.isLive ? (
              <a
                href={`https://meet.jit.si/${meeting.roomId}`}
                target="_blank"
                rel="noreferrer"
                className={styles.joinBtn}
              >
                🔗 Join Meeting
              </a>
            ) : (
              <span className={styles.waitingText}>⏳ Waiting for admin to start</span>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
  );
};

export default UserMeetings;

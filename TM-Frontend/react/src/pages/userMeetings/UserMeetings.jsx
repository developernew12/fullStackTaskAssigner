import React, { useEffect, useState } from "react";
import instance from "../../services/axiosInstance";

const UserMeetings = () => {
  const [meetings, setMeetings] = useState([]);

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
    <div className="meeting-container" style={{ padding: "2rem",height:"100vh" }}>
      <h2 style={{color:"white"}}>Your Upcoming Meetings</h2>
      {meetings.length === 0 ? (
        <p>No meetings assigned.</p>
      ) : (
        <ul>
          {meetings.map((meeting) => (
            <li
              key={meeting._id}
              style={{
                marginBottom: "1.5rem",
                padding: "1rem",
                borderRadius: "6px",
                backgroundColor: meeting.isCancelled ? "#2f2f2f" : "#1f1f1f",
                color: meeting.isCancelled ? "#888" : "#fff",
                border: meeting.isCancelled
                  ? "1px solid red"
                  : "1px solid #444",
              }}
            >
              <strong>{meeting.topic}</strong>
              <br />
              Room ID: {meeting.roomId}
              <br />
              Password: {meeting.password}
              <br />
              Time: {new Date(meeting.scheduledAt).toLocaleString()}
              <br />
              <br />
              {meeting.isCancelled ? (
                <span style={{ color: "red" }}>
                   This meeting has been cancelled
                </span>
              ) : meeting.isLive ? (
                <a
                  href={`https://meet.jit.si/${meeting.roomId}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    borderRadius: "4px",
                    textDecoration: "none",
                  }}
                >
                  🔗 Join Meeting
                </a>
              ) : (
                <span style={{ color: "orange" }}>
                  ⏳ Waiting for admin to start
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserMeetings;

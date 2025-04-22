import React, { useState, useEffect } from "react";
import instance from "../../../services/axiosInstance";
import styles from "./createMeeting.module.css";

const CreateMeeting = () => {
  const [topic, setTopic] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await instance.get("/admin/all-users");
        setAllUsers(res.data);
        console.log("Fetched users:", res);
        
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post("/admin/create-meeting", {
        topic,
        scheduledAt,
        assignedUsers,
      });
      setMessage(" Meeting created and emails sent!");
      setTopic("");
      setScheduledAt("");
      setAssignedUsers([]);
    } catch (err) {
      console.error("Meeting creation failed", err);
      setMessage(" Error creating meeting");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formBox}>
        <h2 className={styles.heading}>📅 Create a New Meeting</h2>
        {message && <p className={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>Topic:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.label}>Scheduled At:</label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.label}>Assign Users:</label>
            <select
              multiple
              value={assignedUsers}
              onChange={(e) =>
                setAssignedUsers(Array.from(e.target.selectedOptions, (opt) => opt.value))
              }
              className={styles.selectBox}
            >
              {allUsers.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.submitBtn}>
            ✅ Create Meeting
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMeeting;

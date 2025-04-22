import React, { useState, useEffect, useContext } from "react";
import instance from "../../../services/axiosInstance";
import styles from "./createMeeting.module.css";
import { AdminContext } from "../../../context/AdminContext";
import { useSnackbar } from "notistack";

const CreateMeeting = () => {
  const [topic, setTopic] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [message, setMessage] = useState("");
  const { darkMode } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.selectContainer}`)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
    setLoading(true);
    e.preventDefault();
    try {
      if (assignedUsers.length === 0) {
        enqueueSnackbar("Users should be assignned", { variant: "error" });
        return;
      }
      const res = await instance.post("/admin/create-meeting", {
        topic,
        scheduledAt,
        assignedUsers,
      });

      enqueueSnackbar("Meeting created and emails sent!", {
        variant: "success",
      });
      setTopic("");
      setScheduledAt("");
      setAssignedUsers([]);
    } catch (err) {
      console.error("Meeting creation failed", err);
      // setMessage(" ");
      enqueueSnackbar("Error creating meeting", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${darkMode ? styles.darkContainer : styles.pageContainer}`}
    >
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

          <div className={styles.selectContainer}>
            <label className={styles.label}>Assign Users:</label>

            <input
              type="text"
              placeholder="Search users by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={() => setShowDropdown(true)}
              className={styles.input}
            />

            {/* Dropdown list */}
            {showDropdown && (
              <ul className={styles.userDropdown}>
                {allUsers
                  .filter(
                    (user) =>
                      !assignedUsers.includes(user._id) &&
                      (user.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                        user.email
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()))
                  )
                  .map((user) => (
                    <li
                      key={user._id}
                      className={styles.userListItem}
                      onClick={() => {
                        setAssignedUsers([...assignedUsers, user._id]);
                        setSearchTerm("");
                        setShowDropdown(false);
                      }}
                    >
                      {user.name} ({user.email})
                    </li>
                  ))}
                {allUsers.filter(
                  (user) =>
                    !assignedUsers.includes(user._id) &&
                    (user.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                      user.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
                ).length === 0 && (
                  <li className={styles.noUser}>No users found</li>
                )}
              </ul>
            )}

            {/* Show selected users */}
            <div className={styles.selectedUsers}>
              {assignedUsers.map((userId) => {
                const user = allUsers.find((u) => u._id === userId);
                return user ? (
                  <span key={user._id} className={styles.userChip}>
                    {user.name}
                    <button
                      className={styles.removeBtn}
                      onClick={() =>
                        setAssignedUsers(
                          assignedUsers.filter((id) => id !== user._id)
                        )
                      }
                    >
                      ⛔

                    </button>
                  </span>
                ) : null;
              })}
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            {loading ? "Creating..." : "Create Meeting"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMeeting;

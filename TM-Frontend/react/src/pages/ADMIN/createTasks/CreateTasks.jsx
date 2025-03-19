import React, { useContext, useEffect, useState } from "react";
import styles from "./createTasks.module.css";
import instance from "../../../services/axiosInstance";
import { useSnackbar } from "notistack";
import { AdminContext } from "../../../context/AdminContext";

const CreateTask = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const {darkMode} = useContext(AdminContext);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await instance.get("/admin/all-users");
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        enqueueSnackbar("Error fetching users", { variant: "error" });
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSearchTerm(user.name);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (
      !taskData.title ||
      !taskData.description ||
      !taskData.deadline ||
      !selectedUser
    ) {
      enqueueSnackbar("All fields are required!", { variant: "error" });
      return;
    }
    const now = new Date();
    const taskDeadline = new Date(taskData.deadline);
    if(taskDeadline < now){
      enqueueSnackbar("Date must be a future date", { variant: "error" });
      return;
    }
    try {
      await instance.post("/task/create", {
        title: taskData.title,
        description: taskData.description,
        assignedTo: selectedUser._id,
        deadline: taskData.deadline,
      });

      enqueueSnackbar("Task created successfully!", { variant: "success" });
      setTaskData({ title: "", description: "", deadline: "" });
      setSelectedUser(null);
      setSearchTerm("");
    } catch (error) {
      enqueueSnackbar(error.response.data.error.message, { variant: "error" });
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.dropdownContainer}`)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${darkMode ? styles.darkContainer : styles.container}`}>
      <h2 className={styles.h2}>Create a New Task</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskData.title}
          onChange={handleChange}
          className={styles.inputFields}
          required
          onClick={() => setShowDropdown(false)}
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={taskData.description}
          className={styles.inputFields}
          onChange={handleChange}
          required
          onClick={() => setShowDropdown(false)}
        ></textarea>

        <div className={styles.dropdownContainer}>
          <input
            type="text"
            placeholder="Search by email or click to see all users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // onFocus={() => setShowDropdown(true)}
            onClick={() => setShowDropdown((prev) => !prev)}
            className={styles.inputFields}
          />

          {showDropdown && (
            <ul className={styles.userList}>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <li key={user._id} onClick={() => handleUserSelect(user)}>
                    {user.name}
                  </li>
                ))
              ) : (
                <li className={styles.noUser}>No users found</li>
              )}
            </ul>
          )}
        </div>

        {selectedUser && (
          <p className={styles.selectedUser}>
            Assigned To:{" "}
            <strong>
              {selectedUser.name} ({selectedUser.email})
            </strong>
          </p>
        )}

        <input
          type="date"
          name="deadline"
          value={taskData.deadline}
          onChange={handleChange}
          className={styles.date}
          required
        />
        
        <button type="submit" className={styles.submit}>
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;

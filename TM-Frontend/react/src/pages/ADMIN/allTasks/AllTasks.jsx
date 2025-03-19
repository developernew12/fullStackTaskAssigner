import React, { useContext, useEffect, useState } from "react";
import styles from "./alltasks.module.css";
import instance from "../../../services/axiosInstance";
import { useSnackbar } from "notistack";
import { AdminContext } from "../../../context/AdminContext";
const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [searchTerm, setSearchTerm] = useState("");
  const {darkMode} = useContext(AdminContext)
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await instance.get("/task/all-tasks");
      console.log(data);
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      enqueueSnackbar("Error fetching Tasks", { variant: "error" });
      console.log("error from fetch tasks: ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 35000);
    return () => clearInterval(interval);
  }, []);
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedBy?.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      task.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
   const getStatusClass = (status) => {
      switch (status.toLowerCase()) {
        case "pending":
          return styles.pending;
        case "not done":
          return styles.notDone;
        case "completed":
          return styles.completed;
        case "in progress":
          return styles.inProgress;
        default:
          return "";
      }
    };
  return (
    <div className={`${darkMode ? styles.darkContainer : styles.container}`}>
      <h2>All Tasks</h2>

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      {loading ? (
        <p>Loading tasks...</p>
      ) : filteredTasks.length > 0 ? (
        <table className={styles.taskTable}>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Assigned To</th>
              <th>Assigned By</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td className={styles.assignedTo}>{task.assignedTo?.name || "Unassigned"}</td>
                <td className={styles.assignedBy}>{task.assignedBy?.username || "Unknown"}</td>
                <td className={styles.deadLine}>{new Date(task.deadline).toLocaleDateString()}</td>
                <td className={`${styles.taskStatus} ${getStatusClass(task.status)}`}>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No matching tasks found.</p>
      )}
    </div>
  );
};

export default AllTasks;

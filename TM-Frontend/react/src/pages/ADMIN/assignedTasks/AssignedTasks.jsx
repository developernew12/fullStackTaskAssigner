import React, { useContext, useEffect, useState } from "react";
import instance from "../../../services/axiosInstance";
import styles from "./assignedTasks.module.css";
import { AdminContext } from "../../../context/AdminContext";
import { useSnackbar } from "notistack";
const AssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { darkMode } = useContext(AdminContext);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchAdminTasks = async () => {
      try {
        const { data } = await instance.get("/admin/assigned-tasks");
        setTasks(data);
        // console.log("huhdudhdhdhdhd: ",data);
      } catch (error) {
        console.error("Error fetching admin assigned tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminTasks();
    const interval = setInterval(fetchAdminTasks, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
  const handleDeleteTask = async (taskId,status) => {
    if(status === "Completed"){
      enqueueSnackbar("Task already completed!", { variant: "info" });
      return;
    }
    if (window.confirm("Are You Sure you want to delete it?")) {
      try {
        await instance.delete(`/task/delete-task/${taskId}`);
        setTasks(tasks.filter((task) => task._id !== taskId));
        enqueueSnackbar("Task Deleted successfully!", { variant: "success" });
      } catch (error) {
        console.error("Error deleting task:", error);
        enqueueSnackbar("Error deleting task:", { variant: "error" });
      }
    }
  };
  return (
    <div className={`${darkMode ? styles.darkContainer : styles.container}`}>
      <h2>Tasks Assigned by Me</h2>

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
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
        
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td className={styles.assignedTo}>
                  {task.assignedTo?.name || "Unassigned"}
                </td>
                <td className={styles.deadLine}>
                  {new Date(task.deadline).toLocaleDateString()}
                </td>
                <td
                  className={`${styles.taskStatus} ${getStatusClass(
                    task.status
                  )}`}
                >
                  {task.status}
                </td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteTask(task._id,task.status)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks assigned by you.</p>
      )}
    </div>
  );
};

export default AssignedTasks;

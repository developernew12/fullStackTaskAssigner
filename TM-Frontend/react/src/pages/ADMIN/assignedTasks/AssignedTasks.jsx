import React, { useEffect, useState } from "react";
import instance from "../../../services/axiosInstance";
import styles from "./assignedTasks.module.css";

const AssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAdminTasks = async () => {
      try {
        const { data } = await instance.get("/admin/assigned-tasks");
        setTasks(data);
      } catch (error) {
        console.error("Error fetching admin assigned tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminTasks();
  }, []);


  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assignedTo?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
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
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.assignedTo?.name || "Unassigned"}</td>
                <td>{new Date(task.deadline).toLocaleDateString()}</td>
                <td>{task.status}</td>
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

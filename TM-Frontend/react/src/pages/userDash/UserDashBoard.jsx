import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./userDash.module.css";

const UserDashBoard = () => {
  const { tasks, fetchTasks, updateTaskStatus, requestDeadline } =
    useContext(AuthContext);
    const { darkMode, setDarkMode } = useContext(AuthContext);
  const [view, setView] = useState("current");
  const [modalTask, setModalTask] = useState(null);
  const [deadlineData, setDeadlineData] = useState({
    newDeadline: "",
    reason: "",
  });

  const navigate = useNavigate();

  const openRequestDeadline = (task) => {
    setModalTask(task);
    setDeadlineData({ newDeadline: "", reason: "" });
  };

  const closeModal = () => {
    setModalTask(null);
  };
  
  const handleSubmit = () => {
    if (
      !deadlineData.newDeadline ||
      isNaN(new Date(deadlineData.newDeadline))
    ) {
      alert("INVALID DATE FORMAT! Use YYYY-MM-DD");
      return;
    }
    if (!deadlineData.reason.trim()) {
      alert("Reason cannot be empty");
      return;
    }

    requestDeadline(
      modalTask._id,
      deadlineData.newDeadline,
      deadlineData.reason
    );
    closeModal();
  };

  useEffect(() => {
    fetchTasks();
    // const interval = setInterval(fetchTasks, 3500);
    // return () => clearInterval(interval);
  }, []);

  const categorizedTasks = {
    current: tasks.filter(
      (task) =>
        (task.status === "Pending" || task.status === "In Progress") &&
        new Date(task.deadline) >= new Date()
    ),
    notCompleted: tasks.filter(
      (task) =>
        task.status === "Not Done" ||
        (task.status !== "Completed" && new Date(task.deadline) < new Date())
    ),
    completed: tasks.filter((task) => task.status === "Completed"),
  };

  return (
    <div className={`${styles.MainContainer} ${darkMode ? styles.dark : ""}`}>
      <h1 className={styles.DashHead}>
        User Dashboard
      </h1>
      <div className={styles.toggleContainer}>
        <input 
          type="checkbox" 
          id="darkmode-toggle" 
          className={styles.toggleCheckbox} 
          checked={darkMode} 
          onChange={() => setDarkMode(!darkMode)}
        />
        <label htmlFor="darkmode-toggle" className={styles.toggleLabel}>
          <span className={styles.toggleIcon}>{darkMode ? "🌙" : "🌞"}</span>
        </label>
      </div>
      <div className={styles.mainButt}>
        {["current", "notCompleted", "completed"].map((type) => (
          <button
            key={type}
            onClick={() => setView(type)}
            className={`px-6 py-2 font-semibold rounded-lg shadow-md transition duration-300 ${
              view === type
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {type === "current"
              ? "Current"
              : type === "notCompleted"
              ? "Not Done"
              : "Completed"}
          </button>
        ))}
      </div>

      <div className={styles.CardContainer}>
        {categorizedTasks[view].length > 0 ? (
          categorizedTasks[view].map((task) => (
            <div key={String(task._id)} className={styles.Card}>
              <h2 className={styles.Tits}>
                {task.title}
              </h2>
              <p className={styles.CardDescription}>
                {task.description.length > 150
                  ? task.description.substring(0, 150) + "..."
                  : task.description}
              </p>
              {task.description.length > 150 && (
                <p
                  className={styles.ViewMoreButton}
                  onClick={() => navigate(`/user/task/${task._id}`)}
                >
                  View More →
                </p>
              )}
              <p className="text-sm text-red-500 font-extrabold">
                Deadline: {new Date(task.deadline).toLocaleDateString()}
              </p>

              {!(task.status === "Completed" || task.status === "Not Done") && (
                <div className={styles.updation}>
                  <label >
                    Update Status:
                  </label>
                  <select
                    className={styles.TaskStatus}
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                  >
                    <option value="Pending">🟡 Pending</option>
                    <option value="In Progress">🔵 In Progress</option>
                    <option value="Completed">✅ Completed</option>
                  </select>
                </div>
              )}

              {!(task.status === "Completed" || task.status === "Not Done") &&
                !task.extensionRequested && (
                  <button
                    className={styles.requestDead}
                    onClick={() => openRequestDeadline(task)}
                  >
                    Request Deadline
                  </button>
                )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600 text-lg">
            No tasks found in this category.
          </p>
        )}
      </div>

      {modalTask && (
        <div className={styles.ModalOverlay}>
          <div className={styles.ModalContent}>
            <h2 className="text-lg font-bold">Request Deadline Extension</h2>
            <p className="text-gray-700">Task: {modalTask.title}</p>

            <label className="block text-gray-700 font-semibold mt-2">
              New Deadline:
            </label>
            <input
              type="date"
              value={deadlineData.newDeadline}
              onChange={(e) =>
                setDeadlineData({
                  ...deadlineData,
                  newDeadline: e.target.value,
                })
              }
              className="w-full p-2 border rounded mt-1"
            />

            <label className="block text-gray-700 font-semibold mt-2">
              Reason:
            </label>
            <textarea
              value={deadlineData.reason}
              onChange={(e) =>
                setDeadlineData({ ...deadlineData, reason: e.target.value })
              }
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter reason"
            ></textarea>

            <div className="flex justify-end gap-2 mt-3">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashBoard;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./userDash.module.css";

const UserDashBoard = () => {
  const { tasks, fetchTasks, updateTaskStatus, requestDeadline } =
    useContext(AuthContext);

  const [view, setView] = useState("current");
  const [expandedTask, setExpandedTask] = useState(null);
  const [deadlineData, setDeadlineData] = useState({
    newDeadline: "",
    reason: "",
  });

  useEffect(() => {
   fetchTasks();
  }, []);

  console.log("Tasks Data:", tasks); // Debugging task data

  /** Toggle request deadline input field */
  const toggleRequestDeadline = (taskId) => {
    console.log("Toggling request deadline for:", taskId); // Debug log
    setExpandedTask(expandedTask === taskId ? null : taskId);
    setDeadlineData({ newDeadline: "", reason: "" });
  };

  /** Handle submitting a deadline extension request */
  const handleSubmit = (taskId) => {
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
    requestDeadline(taskId, deadlineData.newDeadline, deadlineData.reason);
    setExpandedTask(null);
  };

  /** Categorizing tasks */
  // const categorizedTasks = {
  //   current: Array.isArray(tasks)
  //     ? tasks.filter(
  //         (task) =>
  //           task.status !== "Completed" && new Date(task.deadline) >= new Date()
  //       )
  //     : [],
  //   notDone: Array.isArray(tasks)
  //     ? tasks.filter(
  //         (task) =>
  //           task.status !== "Completed" && new Date(task.deadline) < new Date()
  //       )
  //     : [],
  //   completed: Array.isArray(tasks)
  //     ? tasks.filter((task) => task.status === "Completed")
  //     : [],
  // };
  /** Categorizing tasks */
const categorizedTasks = {
  current: Array.isArray(tasks)
    ? tasks.filter(
        (task) =>
          (task.status === "Pending" || task.status === "In Progress") &&
          new Date(task.deadline) >= new Date()
      )
    : [],
  notCompleted: Array.isArray(tasks)
    ? tasks.filter(
        (task) =>
          task.status === "Not Done" || 
          (task.status !== "Completed" && new Date(task.deadline) < new Date())
      )
    : [],
  completed: Array.isArray(tasks)
    ? tasks.filter((task) => task.status === "Completed")
    : [],
};

  return (
    <div className={styles.MainContainer}>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        User Dashboard
      </h1>

      {/* Section Selection Buttons */}
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
              ? "Current Tasks"
              : type === "notCompleted"
              ? "Not Done"
              : "Completed Tasks"}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className={styles.CardContainer}>
        {categorizedTasks[view].length > 0 ? (
          categorizedTasks[view].map((task) => (
            <div key={String(task._id)} className={styles.Card}>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {task.title}
              </h2>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-red-500 font-extrabold">
                Deadline: {new Date(task.deadline).toLocaleDateString()}
              </p>

              {/* ✅ Prevent updates for "Completed" and "Not Done" tasks */}
              {!(task.status === "Completed" || task.status === "Not Done") && (
                  <div className={styles.updation}>
                  <label className="block text-gray-700 font-semibold mt-3">
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

              {/* ✅ Prevent deadline requests for "Completed" and "Not Done" tasks */}
              {!(task.status === "Completed" || task.status === "Not Done") &&
                !task.extensionRequested && (
                  <button
                    className={styles.requestDead}
                    onClick={() => toggleRequestDeadline(task._id)}
                  >
                    {expandedTask === task._id
                      ? "Cancel Request"
                      : "Request Deadline"}
                  </button>
                )}

              {/* ✅ Prevent deadline request form for "Completed" and "Not Done" tasks */}
              {expandedTask === task._id &&
                !(
                  task.status === "Completed" || task.status === "Not Done"
                ) && (
                  <div className={styles.CardContainer}>
                    <label className="block text-gray-700 font-semibold">
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
                        setDeadlineData({
                          ...deadlineData,
                          reason: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded mt-1"
                      placeholder="Enter reason"
                    ></textarea>

                    <div className="flex justify-end gap-2 mt-3">
                      {/* <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        onClick={() => setExpandedTask(null)}
                      >
                        Cancel
                      </button> */}
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleSubmit(task._id)}
                      >
                        Submit Request
                      </button>
                    </div>
                  </div>
                )}

              {task.status === "Completed" && (
                <p className="text-blue-500 text-center font-semibold mt-4">
                  Task Completed
                </p>
              )}
              {task.status === "Not Done" && <p>Task Not Done</p>}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600 text-lg">
            No tasks found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDashBoard;

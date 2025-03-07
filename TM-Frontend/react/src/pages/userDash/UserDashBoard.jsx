import React, { useEffect, useState } from "react";
import axios from "axios";
import { createPortal } from "react-dom";

const UserDashBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("current");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4444/api/v1/user/tasks",
          {
            withCredentials: true,
          }
        );

        let sortedTasks = response.data.tasks.sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );

        setTasks(sortedTasks);
      } catch (error) {
        console.error(
          "Error fetching tasks:",
          error.response?.data || error.message
        );
        alert("Failed to fetch tasks.");
      }
    };

    fetchTasks();
  }, []);

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:4444/api/v1/task/update/status/${taskId}`,
        { status },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status } : task
          )
        );
      }
    } catch (error) {
      console.error(
        "Error updating task status:",
        error.response?.data || error.message
      );

      if (error.response?.status === 403) {
        alert("You can't update the task, the deadline has passed!");
      } else {
        alert("Failed to update task status.");
      }
    }
  };

  const requestDeadline = (taskId) => {
    setModal(
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 text-white transition-transform transform hover:scale-105">
          <h3 className="text-lg font-bold mb-2 text-center">
            Request Deadline Extension
          </h3>
          <input
            type="date"
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded mb-2 mx-auto block transition duration-300 focus:ring focus:ring-blue-500"
            id="newDeadline"
          />
          <textarea
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded mb-2 mx-auto block transition duration-300 focus:ring focus:ring-blue-500"
            placeholder="Enter reason for extension"
            id="reason"
          ></textarea>
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
              onClick={() => setModal(null)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              onClick={() => {
                const newDate = document.getElementById("newDeadline").value;
                const reason = document.getElementById("reason").value;
                if (!newDate || isNaN(new Date(newDate))) {
                  alert("Invalid date format! Please use YYYY-MM-DD.");
                  return;
                }
                if (!reason) {
                  alert("Reason cannot be empty!");
                  return;
                }
                axios
                  .post(
                    `http://localhost:4444/api/v1/task/request-extension/${taskId}`,
                    { newDeadline: newDate, reason },
                    { withCredentials: true }
                  )
                  .then(() => {
                    setTasks((prevTasks) =>
                      prevTasks.map((task) =>
                        task._id === taskId
                          ? { ...task, extensionRequested: true }
                          : task
                      )
                    );
                    setModal(null);
                  })
                  .catch((error) => {
                    console.error(
                      "Error requesting deadline:",
                      error.response?.data || error.message
                    );
                    alert("Failed to request deadline.");
                  });
              }}
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    );
  };

  const currentTasks = tasks.filter(
    (task) =>
      task.status !== "Completed" && new Date(task.deadline) >= new Date()
  );
  const notCompletedTasks = tasks.filter(
    (task) =>
      task.status !== "Completed" && new Date(task.deadline) < new Date()
  );
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  const displayedTasks =
    view === "current"
      ? currentTasks
      : view === "notCompleted"
      ? notCompletedTasks
      : completedTasks;

  return (
    <div
      className="main p-8 bg-cover bg-center"
    >
      {modal && createPortal(modal, document.body)}
      <div className="h-screen w-full bg-zinc-300 bg-opacity-80 p-8 shadow-2xl">
        <h1 className="head text-4xl font-extrabold text-center text-gray-800 mt-10">
          User Dashboard
        </h1>
        <div className="flex justify-center gap-4 my-6">
          <button
            className={`px-6 py-2 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105 ${
              view === "current"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-700 hover:bg-gray-800"
            }`}
            onClick={() => setView("current")}
          >
            Current Tasks
          </button>
          <button
            className={`px-6 py-2 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105 ${
              view === "notCompleted"
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-gray-700 hover:bg-gray-800"
            }`}
            onClick={() => setView("notCompleted")}
          >
            Not Completed Tasks
          </button>
          <button
            className={`px-6 py-2 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105 ${
              view === "completed"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-700 hover:bg-gray-800"
            }`}
            onClick={() => setView("completed")}
          >
            Completed Tasks
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayedTasks.length > 0 ? (
            displayedTasks.map((task) => {
              const isDeadlinePassed = new Date(task.deadline) < new Date();
              return (
                <div
                  key={task._id}
                  className="box bg-gray-900 rounded-lg shadow-lg border border-gray-700 p-6 hover:shadow-xl transition duration-300 transform hover:scale-105"
                >
                  <h2 className="text-xl font-bold text-white mb-1">
                    {task.title}
                  </h2>
                  <p className="text-gray-300 mb-4">{task.description}</p>
                  <p className="text-sm text-gray-500">
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    {/* Status Dropdown */}
                    <div className="mt-4 flex justify-between items-center">
                      {task.status === "Completed" ? (
                        <p className="text-white text-sm font-semibold px-10 py-3 rounded-md shadow-md">
                          ✅ Task Completed
                        </p>
                      ) : (
                        <select
                          className="bg-gray-800 border border-gray-600 text-white text-sm font-semibold rounded-md 
                          px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 
                          hover:bg-gray-700 transition duration-300 shadow-md 
                          appearance-none cursor-pointer"
                          value={task.status}
                          onChange={async (e) => {
                            if (task.status === "Completed") {
                              alert(
                                "You can't change the status of a completed task."
                              );
                              return;
                            }
                            const newStatus = e.target.value;
                            await updateTaskStatus(task._id, newStatus);
                          }}
                        >
                          <option value="Pending">🟡 Pending</option>
                          <option value="In Progress">🔵 In Progress</option>
                          <option value="Completed">✅ Completed</option>
                          <option value="Not Done">❌ Not Done</option>
                        </select>
                      )}
                    </div>

                    {task.status !== "Completed" &&
                      !isDeadlinePassed &&
                      (task.extensionRequested ? (
                        <p className="text-green-400 text-sm font-semibold">
                          Extension Requested
                        </p>
                      ) : (
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded-lg transition duration-200 transform hover:scale-105"
                          onClick={() => requestDeadline(task._id)}
                        >
                          Request Deadline
                        </button>
                      ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center col-span-full text-gray-600 text-lg">
              No tasks found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
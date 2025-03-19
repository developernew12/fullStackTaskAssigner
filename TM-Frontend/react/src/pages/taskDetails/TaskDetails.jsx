import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import instance from '../../services/axiosInstance';
import styles from "./taskDetails.module.css";
const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await instance.get(`/task/${taskId}`); // Ensure the correct endpoint
        setTask(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task:", error);
        setError("Task not found.");
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 className="text-red-500">{error}</h2>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.back}>← Back</button>
      <h1 >{task.title}</h1>
      <p >{task.description}</p>
      <p className={styles.deadline}>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
    </div>
  );
};

export default TaskDetails;

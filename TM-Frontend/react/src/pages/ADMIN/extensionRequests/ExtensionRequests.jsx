import React, { useEffect, useState } from "react";
import styles from "./extensionRequests.module.css";
import instance from "../../../services/axiosInstance";
import { useSnackbar } from "notistack";

const ExtensionRequests = () => {
  const [requests, setRequests] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [selectedTask,setSelectedTask] = useState(null);
  const [newDeadline,setNewDeadLine] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data } = await instance.get("/task/extension-requests");
      console.log("Requests data:", data);
      setRequests(data.extensionRequests);
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Error fetching requests",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApproveClick = (taskId) => {
    
    setSelectedTask(taskId);

    setNewDeadLine("");
    enqueueSnackbar("Enter the approved deadline below and submit!",{variant:"info"});
  };
  const handleCancelClick = () => {
    setSelectedTask(null);
    setNewDeadLine("");
  };
  const handleApproveSubmit = async () => {
    if(!newDeadline || isNaN(new Date(newDeadline))){
      enqueueSnackbar("Invalid date fomrat! Use YYYY-MM-DD",{variant:"error"});
      return;
    }
    try {
      await instance.post(`/task/approve-extension/${selectedTask}`,{approved:true,newDeadline});
      enqueueSnackbar("Deadline approved sucessfully!",{variant:"success"});
      setRequests((prevRequests) => prevRequests.filter(task => task._id !== selectedTask));

      setSelectedTask(null);

    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Error approving request",{variant:"error"});
    }
  }
  useEffect(() => {
    fetchRequests();
  }, []);
  const handleRejectClick = async (taskId) => {
    try {
      await instance.post(`/task/approve-extension/${taskId}`, { approved: false });
      enqueueSnackbar("Deadline request rejected.", { variant: "info" });
      setRequests(prevRequests => prevRequests.filter(task => task._id !== taskId));
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Error rejecting request", { variant: "error" });
    }
  };
  return (
    <div className={styles.container}>
      <h1>Extension Requests</h1>
      {loading ? (
        <>
          <img src="/loading.gif" alt="" id="loadingMin" />
          <p>Loading...</p>
        </>
      ) : requests.length === 0 ? (
        <p>No Pending Requests...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>taskName</th>
              <th>assignedUser</th>
              <th>oldDeadline</th>
              <th>reqDeadline</th>
              <th>reason</th>
              <th>actions</th>
             
            </tr>
          </thead>
          <tbody>
            {requests.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.assignedTo?.name || "Unknown"}</td>
                <td>{new Date(task.deadline).toLocaleDateString()}</td>
                <td>
                  {task.newDeadLine
                    ? new Date(task.newDeadLine).toLocaleDateString()
                    : "Not Provided"}
                </td>
                <td>{task.extensionReason}</td>
                <td>
                  {
                    selectedTask === task._id ? (
                      <div className={styles.approveContainer}>
                        <input type="date" value={newDeadline} onChange={(e) => setNewDeadLine(e.target.value)} className={styles.input}/>
                        <button className={styles.submit} onClick={handleApproveSubmit}>Submit</button>
                        <button className={styles.cancel} onClick={handleCancelClick}>Cancel</button>
                      </div>
                    ) : (
                      <>
                       <button className={styles.approve} onClick={() => handleApproveClick(task._id)}>Approve</button>
                       <button className={styles.reject} onClick={() => handleRejectClick(task._id)}>Reject</button>
                      </>
                     
                    )
                  }
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExtensionRequests;

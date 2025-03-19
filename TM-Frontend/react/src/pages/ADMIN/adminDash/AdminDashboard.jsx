import React, { useContext, useEffect, useState } from "react";
import instance from "../../../services/axiosInstance";
import styles from "./adminDash.module.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import CountUp from "react-countup";
import { AdminContext } from "../../../context/AdminContext";
const AdminDashboard = () => {
  const { admin,darkMode,setDarkMode } = useContext(AdminContext);
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalTasks: 0,
    ongoingTasks: 0,
  });
   
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashBoardData = async () => {
      try {
        setLoading(true);
        const { data } = await instance.get("/admin/dashboard");
        // setDashboardData(data);
        setDashboardData((prevData) => {
          return JSON.stringify(prevData) !== JSON.stringify(data)
            ? data
            : prevData;
        });
        console.log(data);
      } catch (error) {
        console.log("Error fetching admin dashboard data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashBoardData();
    const interval = setInterval(fetchDashBoardData, 35000);
    return () => clearInterval(interval);
  }, []);

  const charData = [
    { name: "CompletedTasks", value: dashboardData.completedTasks },
    { name: "OngoingTasks", value: dashboardData.ongoingTasks },
    // {name:"TotalTasks", value: dashboardData.totalTasks}
  ];
  const COLORS = ["#00C49F", "#FF8042", "#FF9942"];

  return (
    <div className={`${darkMode ? styles.darkContainer : styles.mainContainer}`}>
      <h1>Admin Dashboard</h1>
      {loading ? (
        <>
          <img src="/loading.gif" alt="" />
          <p>Loading...</p>
        </>
      ) : (
        <div className={styles.ItemContainer}>
          <div className={styles.leftContainer}>
            {/* <p>Total Users:<em>{dashboardData.totalUsers}</em></p>
            <p>Total Tasks:<em>{dashboardData.totalTasks}</em> </p>
            <p>Ongoing Tasks:<em>{dashboardData.ongoingTasks}</em></p>
            <p>Completed Tasks:<em>{dashboardData.completedTasks}</em></p> */}
            <div>
            <h2 className={styles.username}>Hello,{admin.username}!</h2>
            </div>
            

            <p>
              Total Users:{" "}
              <em>
                <CountUp end={dashboardData.totalUsers} duration={2} />
              </em>
            </p>
            <p>
              Total Tasks:{" "}
              <em>
                <CountUp end={dashboardData.totalTasks} duration={2} />
              </em>
            </p>
            <p>
              Ongoing Tasks:{" "}
              <em>
                <CountUp end={dashboardData.ongoingTasks} duration={2} />
              </em>
            </p>
            <p>
              Completed Tasks:{" "}
              <em>
                <CountUp end={dashboardData.completedTasks} duration={2} />
              </em>
            </p>
          </div>
          <div className={styles.rightContainer}>
            <PieChart width={400} height={300} className={styles.legend}>
              <Pie
                data={charData}
                cx="50%"
                cy="49%"
                outerRadius={90}
                fill="red"
                dataKey="value"
                label
              >
                {charData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                wrapperStyle={{
                  border: "none",
                  boxShadow: "none",
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                  fontSize: "1.1em",
                  fontWeight: "bold",
                }}
                
              />
            </PieChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

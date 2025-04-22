import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./userHeader.module.css";
import instance from '../../services/axiosInstance';

const UserHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const [hasMeeting, setHasMeeting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMeetings = async () => {
      try {
        const res = await instance.get("/user/meetings");
        if (res.data.meetings.length > 0) {
          setHasMeeting(true);
        }
      } catch (err) {
        console.error("Meeting fetch error:", err);
      }
    };
    checkMeetings();
  }, []);

  return (
    <div className={styles.container}>
      {user ? (
       <Link to="/user"> <h2 className={styles.headerH2}>Hello, {user.name}!</h2></Link>
      ) : (
        <h2>Loading...</h2>
      )}

      <div
        className={styles.notificationIcon}
        onClick={() => navigate("/user/meetings")}
        title={hasMeeting ? "New Meeting Assigned" : "No Meeting"}
      >
        ⚡
        {hasMeeting && <span className={styles.dot}></span>}
      </div>
      <div>
      <button className={styles.logout} onClick={logout}>LogOut</button>
      </div>
      
    </div>
  );
};

export default UserHeader;

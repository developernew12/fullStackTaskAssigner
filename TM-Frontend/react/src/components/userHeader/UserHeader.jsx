import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from "./userHeader.module.css";

const UserHeader = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.greeting}>
        <h2>Welcome, {user.name}!</h2>
      </div>
      <button className={styles.logoutButton} onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default UserHeader;

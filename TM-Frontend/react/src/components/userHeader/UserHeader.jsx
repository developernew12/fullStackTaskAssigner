import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import styles from "./userHeader.module.css";

const UserHeader = () => {
  const {user,logout} = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <div>
        <h2>Hello,{user.name}!</h2>
      </div>
      <button>LogOut</button>
    </div>
  )
}

export default UserHeader

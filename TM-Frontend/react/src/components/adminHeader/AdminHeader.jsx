import React, { useContext } from 'react'

import styles from "./adminHeader.module.css";
import { AdminContext } from '../../context/AdminContext';
const AdminHeader = () => {

  const { admin,logout }  = useContext(AdminContext);

  console.log("Admin Header log: ",admin.username);
    
  return (
   
      <div className={styles.container}>
            <div className={styles.navHead}>
              {/* <h2>Hello,{admin.username}!</h2>  */}
              <img src="/logo.webp" alt="" srcset="" />
            </div>
            <div className={styles.button}>
              <ul >
                <li>deadlineRequests</li>
                <li>users</li>
                <li>createTask</li>
                <li>assignedTasks</li>
                <li>allTasks</li>
              </ul>
              <button styles={styles.logout} onClick={()=>logout()}>Logout</button>
            </div>
            {/* <button onClick={()=> logout()}>LogOut</button> */}
      </div>
    
  )
}

export default AdminHeader

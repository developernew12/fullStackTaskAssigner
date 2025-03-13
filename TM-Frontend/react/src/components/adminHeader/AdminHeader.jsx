import React, { useContext } from 'react'

import styles from "./adminHeader.module.css";
import { AdminContext } from '../../context/AdminContext';
import { Link } from 'react-router-dom';
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
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/admin">dashboard</Link></li>
                <li><Link to="/admin/extensionRequests">extensionRequests</Link></li>
                <li><Link to="/admin/users">users</Link></li>
                <li><Link to="/admin/createTask">createTask</Link></li>
                <li><Link to="/admin/assignedTasks">assignedTasks</Link></li>
                <li><Link to="/admin/allTasks">allTasks</Link></li>
              </ul>
              <button styles={styles.logout} onClick={()=>logout()}>Logout</button>
            </div>
            {/* <button onClick={()=> logout()}>LogOut</button> */}
      </div>
    
  )
}

export default AdminHeader

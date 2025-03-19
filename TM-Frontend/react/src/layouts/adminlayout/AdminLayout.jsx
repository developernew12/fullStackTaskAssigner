import React, { useContext } from 'react'
import AdminHeader from '../../components/adminHeader/AdminHeader'
import styles from "./adminLayout.module.css";
import { Outlet } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
const AdminLayout = ({children}) => {
    const { darkMode, setDarkMode } = useContext(AdminContext);
  return (
    <div className={`${styles.layoutContainer}${darkMode ? "dark-layout" : ""}`}>
      <AdminHeader/>
      <div className={`${styles.pageContent}`}>
        <Outlet/>
      </div>
    </div>
    
  )
}

export default AdminLayout

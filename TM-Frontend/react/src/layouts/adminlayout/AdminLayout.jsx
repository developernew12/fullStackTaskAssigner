import React from 'react'
import AdminHeader from '../../components/adminHeader/AdminHeader'
import styles from "./adminLayout.module.css";
import { Outlet } from 'react-router-dom';
const AdminLayout = ({children}) => {
  return (
    <div className={styles.layoutContainer}>
      <AdminHeader/>
      <div className={styles.pageContent}>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout

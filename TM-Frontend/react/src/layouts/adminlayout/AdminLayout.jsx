import React from 'react'
import AdminHeader from '../../components/adminHeader/AdminHeader'
import styles from "./adminLayout.module.css";
const AdminLayout = ({children}) => {
  return (
    <div className={styles.layoutContainer}>
      <AdminHeader/>
      <main>{children}</main>
    </div>
  )
}

export default AdminLayout

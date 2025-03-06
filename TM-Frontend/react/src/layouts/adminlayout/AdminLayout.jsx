import React from 'react'
import AdminHeader from '../../components/adminHeader/AdminHeader'

const AdminLayout = (children) => {
  return (
    <div>
      <AdminHeader/>
      <main>{children}</main>
    </div>
  )
}

export default AdminLayout

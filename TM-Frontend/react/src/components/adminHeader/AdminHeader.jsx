import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const AdminHeader = () => {
  const {user} = useContext(AuthContext);

  return (
    <div>
      
    </div>
  )
}

export default AdminHeader

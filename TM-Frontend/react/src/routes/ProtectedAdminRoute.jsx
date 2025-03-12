import React, { useContext } from 'react'

import { Navigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const ProtectedAdminRoute = ({children}) => {
  
  const { admin,adminLoading } = useContext(AdminContext);
  console.log(" Protected Admin Route: Admin =", admin);
  if (adminLoading === undefined) {
    console.error(" authLoading is undefined! Fix in AuthContext");
    return null;
  }
  if(adminLoading) return(
    <div id='loadingMin'>
      <img src='/loading.gif'/>
      <p>Loading...</p>
    </div>
  )
  
  if(!admin || admin.role !== "admin"){
    return <Navigate to="/adminLogin"/>;
  }

  return children;
}

export default ProtectedAdminRoute;

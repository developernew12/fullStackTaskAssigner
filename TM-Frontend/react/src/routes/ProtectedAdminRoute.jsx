import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({children}) => {
  
  const { user,loading } = useContext(AuthContext);

  if(loading) return(
    <div>
      <img src='/loading.gif'/>
      <p>Loading...</p>
    </div>
  )
  
  if(!user || user.role !== "admin"){
    return <Navigate to="/"/>;
  }

  return children;
}

export default ProtectedAdminRoute;

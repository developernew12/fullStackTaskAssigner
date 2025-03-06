import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedUserRoute = ({children}) => {
  const { user,loading } = useContext(AuthContext);
  console.log("Protecteduser: ",user);
  
  if(loading) return(
    <div>
      <img src='/loading.gif'/>
      <p>Loading...</p>
    </div>
  )
  
  if(!user || user.role !== "user"){
    return <Navigate to="/user/dashboard"/>;
  }

  return children;
  
}

export default ProtectedUserRoute;

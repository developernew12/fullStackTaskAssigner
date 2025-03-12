import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedUserRoute = ({children}) => {
  const { user,authLoading } = useContext(AuthContext);
  console.log("protected user: ",user);
  console.log("Loading state:", authLoading);


  if (authLoading === undefined) {
    console.error("authLoading is undefined! Fix in AuthContext");
    return null;
  }
  if (authLoading) {
    return (
      <div >
        <img src="/loading.gif" width="400px" />
        <p>Loading...</p>
      </div>
    );
  }
  
  // Ensure user is set before checking role
  
 
  if (!user || user.role !== "user") {
    console.log("User not found or not authorized. Redirecting...");
    return <Navigate to="/" />;
  }
      
      // if (user?.role === "admin") {
      //   return <Navigate to="/" />;
      // }

  
  
  
  return children;
  


  
}

export default ProtectedUserRoute;

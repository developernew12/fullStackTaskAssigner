import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedUserRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  console.log("ProtectedUser:", user, "Loading:", loading);

  if (loading) {
    return (
      <div>
        <img src="/loading.gif" alt="Loading..." />
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/" />; // Redirect to `/login` if not logged in

  if (user.role !== "user") return <Navigate to="/unauthorized" />; //  Redirect unauthorized users

  return children;
};

export default ProtectedUserRoute;

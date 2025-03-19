import React, { useContext, useState } from "react";
import styles from "./resetPassword.module.css";
import { useParams } from "react-router-dom";
import instance from "../../services/axiosInstance";
import { AuthContext } from "../../context/AuthContext";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const { resetPassword,loading } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Reset Password Token:", token); 
    await resetPassword(password,token);
  };
  return (
    <>
    <video autoPlay loop muted className={styles.bgVideo}>
                <source src="/1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
     <div className={styles.container}>
      <h1>Set a new Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{loading ? "Submiting..." : "Submit"}</button>
      </form>
    </div>
    </>
   
  );
};

export default ResetPassword;

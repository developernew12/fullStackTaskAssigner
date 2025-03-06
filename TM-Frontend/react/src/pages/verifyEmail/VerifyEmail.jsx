import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import instance from '../../services/axiosInstance';
import styles from "./verifyEmail.module.css";

const VerifyEmail = () => {
  const URL = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const[message,setMessage] = useState("");
  const token = URL.get("token");

  useEffect(() =>{
   const sendToken = async () => {
    try {
      const res = await instance.post("/auth/verify-token",{ token });
      setMessage(res.data.message);
      console.log("verifyEmailRes: ",res);
      
    } catch (error) {
      setMessage("Verification Failed!");
      console.log(error);
      
    }
   };
   if(token){
    sendToken();
   }
  },[token,navigate]);
  if(!token){
    return(
      <h1>
        Missing Token Please go back to<Link to="/">Home</Link>
      </h1>
    )
  }
  return (
    <div className={styles.container}>
      {message && <h1>{message}</h1>}
      <Link to="/"><h2>Login</h2></Link>
    </div>
  )
}

export default VerifyEmail

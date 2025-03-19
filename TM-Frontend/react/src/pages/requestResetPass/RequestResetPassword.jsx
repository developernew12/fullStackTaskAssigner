import React, { useContext, useState } from 'react'
import styles from "./requestReset.module.css";
import { AuthContext } from '../../context/AuthContext';
const RequestResetPassword = () => {
    const { requestResetPassword,loading,message } = useContext(AuthContext);
    const [email,setEmail] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await requestResetPassword (email);
    }
  return (
    <>
    <video autoPlay loop muted className={styles.bgVideo}>
                    <source src="/1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
    <div className={styles.container}>
        {message && <p>{message}</p>}
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{loading ? "Sending..." : "Send Link"}</button>
      </form>
    </div>
    </>
    
  )
}

export default RequestResetPassword

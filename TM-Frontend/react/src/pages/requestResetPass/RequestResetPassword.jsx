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
    <div className={styles.container}>
        {message && <p>{message}</p>}
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{loading ? "Sending..." : "Send Reset Link"}</button>
      </form>
    </div>
  )
}

export default RequestResetPassword

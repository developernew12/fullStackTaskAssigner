import React, { useContext, useState } from 'react'
import styles from "./adminLogin.module.css";
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../../context/AdminContext';
const AdminLogin = () => {
  const { login, loading } = useContext(AdminContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log("handleSubmitLoding...");

    e.preventDefault();
    await login(username, password,navigate);
  };
  return (
    <div>
        <div className={styles.container}>
          <img src="/logo.webp" alt="" width="200px" />
          <form onSubmit={handleSubmit} className={styles.form} >
           <h2>ADMINLOGIN</h2>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="password"
              value={password}
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{loading ? "Submiting..." : "Submit"}</button>
          </form>
        </div>
    </div>
  )
}

export default AdminLogin

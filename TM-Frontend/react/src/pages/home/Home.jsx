import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./home.module.css";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.container}>
         <button onClick={()=> navigate("/userLogin")}>User Login</button>
         <button onClick={()=> navigate("/adminLogin")}>Admin Login</button>
      </div>
      <h2>taskAssigner</h2>
      <p>Select an Login Option</p>
    </div>
  )
}

export default Home

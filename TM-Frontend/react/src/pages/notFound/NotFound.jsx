import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./notFound.module.css";
const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>You are so Lost</h1>
      <p>Head back <Link to="/">here</Link></p>
      <div>
        <img src="/giphy.gif" alt="" />
      </div>
    </div>
  )
}

export default NotFound

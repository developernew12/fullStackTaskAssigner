import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import styles from "./userHeader.module.css";

const UserHeader = () => {
  const {user,logout} = useContext(AuthContext);
  console.log("userHeader Res: ",user);
  
  return (
    <div className={styles.container}>
      <div>
      {user ? <h2>Hello, {user.name}!</h2> : <h2>Loading...</h2>}
      </div>
      <button onClick={()=> logout()}>LogOut</button>
    </div>
  )
}

export default UserHeader

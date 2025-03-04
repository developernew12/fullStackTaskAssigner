import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
//   const {  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    e.preventDefault();
    await login(email, password, false);
  };
  return (
     <>
     <div className={styles.mainDiv}>
     <h1>taskAssigner</h1>
  
      <div className={styles.container}>
        {/* <button onClick={()=> navigate("/userLogin")}>User Login</button> */}
        <h2>User_Login</h2>
        <form onSubmit={handleSubmit} >
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
       <button onClick={() => navigate("/adminLogin")}>Admin Login</button>
       </div>
     </>
  );
};

export default Home;

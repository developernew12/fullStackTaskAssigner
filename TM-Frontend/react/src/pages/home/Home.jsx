import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { login, message, loading, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log("handleSubmitLoding...");

    e.preventDefault();
    await login(email, password, false, navigate);
  };

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <img src="/loading.gif" alt="Loading..." width="300px" />
        <h2>Loading, please wait...</h2>
      </div>
    );
  }
  return (
    <>
       <video autoPlay loop muted className={styles.bgVideo}>
        <source src="/1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.mainDiv}>
        <div className={styles.heading}>
          <h1>taskAssigner</h1>
        </div>

        <div className={styles.container}>
          {message && <h3>{message}</h3>}

          {/* <button onClick={()=> navigate("/userLogin")}>User Login</button> */}
          <h2>User_Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <p>
              Not have a Account register <Link to="/register-user">Here.</Link>
            </p>
            <Link to="/requestResetPassword">
              <p>Reset Password</p>
            </Link>
            <button type="submit">{loading ? "Submiting..." : "Submit"}</button>
          </form>
        </div>
        <button
          onClick={() => navigate("/adminLogin")}
          className={styles.adminBut}
        >
          Admin Login
        </button>
      </div>
    </>
  );
};

export default Home;

import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import styles from "./register.module.css";

const Register = () => {
    const {register,loading,message} = useContext(AuthContext);
    const[email,setEmail] = useState("");
    const[name,setName]=useState("");
    const[password,setPassword]=useState("");
    const[cpassword,setCpassword] = useState("");
    const[error,setError] = useState("");
    
    // const[formData,setFormData] = useState({
         
    // });

       
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== cpassword){
            setError("Password do not match");
            setTimeout(()=>{
               setError("");
            },2000);
            return;
          }
          setError("");
     const success = await register(name,email,password); 
     if(success){
        setEmail("");
        setName("");
        setPassword("");
     }
    }
   
   
  return (
    <>
    <video autoPlay loop muted className={styles.bgVideo}>
            <source src="/1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        <div className={styles.container}>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
        <div className={styles.logo}>
                  <img src="/logo.webp" alt="" srcset="" width="200px" className={styles.img}/>
                  </div>
       <h2>USER REGISTER</h2>
        <form onSubmit={handleSubmit} >
        <input
            type="text"
            value={name}
            name="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name='email'
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
          <input
            type="password"
            value={cpassword}
            name="cpassword"
            placeholder="Confirm Password"
            onChange={(e) => setCpassword(e.target.value)}
            required
          />
          <button type="submit">{loading ? "Submiting..." : "Submit" }</button>
        </form>
    </div>
    </>

  )
}

export default Register;

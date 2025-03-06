import { createContext, useState, useEffect } from "react";

import instance from "../services/axiosInstance";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user,setUser] = useState(null);
  const[loading,setLoading] = useState(false);
  const[message,setMessage] = useState("");

 
  useEffect(()=>{

    const verifyUser = async () => {
        console.log("AuthContext Loading Effect");
        
        try {
            const adminRes = await instance.get("/admin/verify-user");
            console.log("adminRes: ",adminRes);
            return;
        } catch (error) {
            console.log("adminError: ",error); 
        } try {
            const userRes = await instance.get("/user/verify-user");
            console.log("userRes: ",userRes);
            return;
            
        } catch (error) {
            console.log("userError: ",error);
            
        }
    }
    verifyUser();
  },[]);
    const register = async (name,email,password) => {
        console.log("registerLoading...");
        
        setLoading(true);
        try {
            const res = await instance.post("/user/register",{name,email,password});
            console.log("registerRes: ",res);
            setMessage(res.data.message);
            setTimeout(() => {
              setMessage("");
            },2000);
            
            return true;
        } catch (error) {
            console.log(error
            );
            return false;
        } finally{
            setLoading(false);
        }
    }
    const login = async (emailOrUserName,password,isAdmin=false,navigate) => {
      setLoading(true);
      try {
        const endpoint = isAdmin ? "/admin/login" :"/user/login";
        console.log("endpoint: ",endpoint);
        
        const res = await instance.post(endpoint,{email:emailOrUserName,password});
        console.log("login res: ",res);

        setMessage(res.data.message);
        
        // if(res.data.user){
        //   setUser(res.data.user);
        // } else{
        //   setUser(res.data.admin);
        // }
        setUser(res.data.user || res.data.admin);
        console.log("user: ",res.data.user || res.data.admin);
        setTimeout(() => {
          setMessage("");
          navigate(res.data.user?.role === "admin" ? "/admin/dashboard" :"/user/dashboard");
          setLoading(false); 
        },2000);

      } catch (error) {
        console.log("loginError: ",error);
        setMessage(error.response.data.message);
        setTimeout(()=>{
         setMessage("");
         setLoading(false);
        },2000);
      } 
    }
  return (
    <AuthContext.Provider value={{login,register,loading,message,user}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

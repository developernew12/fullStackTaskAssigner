import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../services/axiosInstance";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user,setUser] = useState(null);
  const[loading,setLoading] = useState(true);
//   const navigate = useNavigate();
 
  useEffect(()=>{

    const verifyUser = async () => {
        console.log("AuthContext Loading Effect");
        
        try {
            const adminRes = await instance.get("/admin/verify-admin");
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
    const login = async (emailOrUserName,password,isAdmin=false) => {
      try {
        const endpoint = isAdmin ? "/admin/login" :"/user/login";
        console.log("endpoint: ",endpoint);
        
        const res = await instance.post(endpoint,{email:emailOrUserName,password});
        console.log("login res: ",res);
        
      } catch (error) {
        console.log("loginError: ",error);
        
      }
    }
  return (
    <AuthContext.Provider value={{login}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

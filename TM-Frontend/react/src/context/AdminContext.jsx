import { createContext, useState, useEffect } from "react";

import instance from "../services/axiosInstance";
import { useSnackbar } from "notistack";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const [message, setMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [adminLoading, setAdminLoading] = useState(true);
//   const [tasks,setTasks] = useState([]);


  useEffect(() => {
    console.log(" AdminContext Mounted");
    console.log(" Current Admin State:", admin);
    const verifyAdmin = async () => {
      console.log("AdminContext Loading Effect");
      // setAdminLoadingAuth(true);
      setAdminLoading(true); 
      
     
        try {
          const adminRes = await instance.get("/admin/verify-user");
          // const adminRes = await instance.get("/admin/verify-user");
          console.log("adminRes: ", adminRes);
          console.log("this from admin context");
          
          if (adminRes.data.admin) {
            console.log(" Setting Admin:", adminRes.data.admin);
            setAdmin(adminRes.data.admin);
          } else {
            console.log(" No admin data received:", adminRes.data);
            setAdmin(null);
          }
          // if (userRes.data?.user) {
          //   setAdmin(userRes.data.user);
          // } else {
          //   setAdmin(null);
          // }


          
       
          
          
          // verifiedUser = userRes.data;
        } catch (error) {
          // console.log(" User verification failed. Trying admin...");
          // try {
           console.log(error);
           setAdmin(null);
          //   const adminRes = await instance.get("/admin/verify-user");
          //   console.log(" Admin Verified:", adminRes.data);
          //   setAdmin(adminRes.data.admin);
          // } catch (adminError) {
          //   console.log(" Both user & admin verification failed.");
          //   setAdmin(null);
          // }
        }  finally{
          setTimeout(() => {
            //  setMessage("");
            setAdminLoading(false);
          }, 2000);
        }
      
      // setAdmin(verifiedUser); 
  
      
    };
     verifyAdmin();
  }, []);

  const logout = async () => {
    await instance.post("/admin/logout"); // Clear cookie on the backend
    setAdmin(null); // Remove user from state
  };
  const login = async (
    username,
    password,
    navigate
  ) => {
    // console.log(email,password,navigate);
    
    setAdminLoading(true);
    try {
      const res = await instance.post("/admin/login",{username,password});
      console.log("✅ Admin Login Success:", res.data);
      setAdmin(res.data.admin);
      if (res.data.admin) {
        console.log("✅ Setting Admin:", res.data.admin);
        setAdmin(res.data.admin); // Store admin in state
        enqueueSnackbar(res.data.message, { variant: "success" });
        navigate("/admin/dashboard");
      } else {
        console.log("❌ Admin data missing from response");
      }
      
      
    //   setTimeout(() => {
    //     setMessage("");
    //     setAdminLoading(false);
    //     navigate("/admin/dashboard");
    //   }, 2000);
    } catch (error) {
      console.log("loginError: ", error);
      // setMessage(error.response.data.message);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setTimeout(() => {
       
        setAdminLoading(false);
      }, 2000);
     
    } finally{
      setTimeout(() => {
        setAdminLoading(false);
      }, 2000);
    }
  };
  
    return (
      <AdminContext.Provider
        value={{
          login,
          message,
          admin,
          adminLoading,
          logout
        }}
      >
        {children}
      </AdminContext.Provider>
    );

}
export default AdminProvider;
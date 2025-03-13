import { createContext, useState, useEffect } from "react";

import instance from "../services/axiosInstance";
import { useSnackbar } from "notistack";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [authLoading, setAuthLoading] = useState(true);
  const [tasks,setTasks] = useState([]);

  console.log(user);
  useEffect(() => {
    const verifyUser = async () => {
      console.log("AuthContext Loading Effect");
      // setLoadingAuth(true);
      setAuthLoading(true); 
      
     
        try {
          const userRes = await instance.get("/user/verify-user");
          // const adminRes = await instance.get("/admin/verify-user");
          console.log("userRes: ", userRes);
          setUser(userRes.data.user);
          // if (userRes.data?.user) {
          //   setUser(userRes.data.user);
          // } else {
          //   setUser(null);
          // }


          
       
          
          
          // verifiedUser = userRes.data;
        } catch (error) {
          // console.log(" User verification failed. Trying admin...");
          // try {
           console.log(error);
           
          //   const adminRes = await instance.get("/admin/verify-user");
          //   console.log("✅ Admin Verified:", adminRes.data);
          //   setUser(adminRes.data.admin);
          // } catch (adminError) {
          //   console.log(" Both user & admin verification failed.");
          //   setUser(null);
          // }
        }  finally{
          setTimeout(() => {
            //  setMessage("");
            setAuthLoading(false);
          }, 2000);
        }
      
      // setUser(verifiedUser); 
  
      
    };
     verifyUser();
  }, []);
 
  
  const register = async (name, email, password) => {
    console.log("registerLoading...");

    setLoading(true);
    try {
      const res = await instance.post("/user/register", {
        name,
        email,
        password,
      });
      console.log("registerRes: ", res);
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 2000);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  const login = async (
    email,
    password,
    navigate
  ) => {
    console.log(email,password,navigate);
    
    setLoading(true);
    try {
      // const endpoint = isAdmin ? "/admin/login" : "/user/login";
      // console.log("endpoint: ", endpoint);
      const res = await instance.post("/user/login",{email,password});
      setUser(res.data.user);
      console.log("login res: ",res);
      
      // let res;
      // if (isAdmin) {
      //   res = await instance.post(endpoint, {
      //     username: emailOrUsername, // Admin login uses username
      //     password,
      //   });
      // } else {
      //   res = await instance.post(endpoint, {
      //     email: emailOrUsername, // User login uses email
      //     password,
      //   });
      // }
      // console.log("🔹 Login response:", res);

      // setMessage(res.data.message);
      enqueueSnackbar(res.data.message, { variant: "success" });
      // if(res.data.user){
      //   setUser(res.data.user);
      // } else{
      //   setUser(res.data.admin);
      // }
    
      console.log("user: ", res.data.user);
      setTimeout(() => {
        setMessage("");
        setLoading(false);
        navigate("/user/dashboard");
        
      }, 2000);
      
    } catch (error) {
      console.log("loginError: ", error);
      // setMessage(error.response.data.message);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setTimeout(() => {
        //  setMessage("");
        setLoading(false);
      }, 2000);
      // setTimeout(()=>{
      //   setMessage("");
      // },4000);
    } finally{
      setTimeout(() => {
        //  setMessage("");
        setLoading(false);
      }, 2000);
    }
  };
 
  const requestResetPassword = async (email) => {
    setLoading(true);
    try {
      const res = await instance.post("/user/reset-password-request", {
        email,
      });
      setLoading(false);
      // setMessage(res.data.message);
      enqueueSnackbar("Password reset Link Sent To Your Email", {
        variant: "success",
      });
      // setTimeout(() => {
      //   setMessage("");
      // }, 2000);
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "And error occured", {
        variant: "error",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const resetPassword = async (password,token) => {
    console.log("resetPassowordTrig...","This is token",token);
    setLoading(true);
    try {
      const res = await instance.post("/user/reset-password", {
         token,
         newPassword: password,
      });
      enqueueSnackbar(res.data.message, { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response?.data?.message || "And error occured", {
        variant: "error",
      });
    } finally{
      setLoading(false);
    }
  };
  const fetchTasks = async () => {
    
    try {
      const res = await instance.get("/user/tasks");
      console.log("fetchTasks",res);
      
      let sortedTasks = res.data.tasks.sort(
        (a,b) => new Date(a.deadline) - new Date(b.deadline)
      );
      setTasks(sortedTasks);
    } catch (error) {
      console.log("Fetching Data Error: ",error);
      enqueueSnackbar("Failed to fetch tasks.",{variant:"error"});
    } 
  }
  const updateTaskStatus = async (taskId,status) => {
    try {
      const res = await instance.put(`/task/update/status/${taskId}`,{status});
      if(res.status === 200) {
        setTasks((prevTasks)=>
           prevTasks.map((task) =>
            task._id === taskId ? {...task,status} : task
        )
        );
        enqueueSnackbar("Task status updated!",{variant:"success"});
      }
    } catch (error) {
      if (error.response?.status === 403) {
        enqueueSnackbar("You can't update the task, the deadline has passed!", { variant: "warning" });
      } else {
        enqueueSnackbar("Failed to update task status.", { variant: "error" });
      }
    }
  }
  const requestDeadline = async (taskId,newDeadline,reason) => {
    try {
      console.log("🔹 Sending newDeadline:", newDeadline);
      if(!newDeadline || isNaN(new Date(newDeadline))){
        enqueueSnackbar("Invalid date Format! use YYYY-MM-DD.",{variant:"warning"});
        return;
      }
      if(!reason) {
        enqueueSnackbar("Reason cannot be empty!",{variant:"warning"});
        return;
      }
      await instance.post(`/task/request-extension/${taskId}`,{newDeadline: new Date(newDeadline),reason});
      console.log("✅ Request Sent Successfully:",newDeadline,reason );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, extensionRequested: true } : task
        )
      );
      enqueueSnackbar("Deadline extension requested!", { variant: "success" });
    } catch (error) {
      console.error("Error requesting deadline:", error.response?.data || error.message);
      enqueueSnackbar(error.response?.data || error.message, { variant: "error" });
    }
  }
  const logout = async () => {
    await instance.post("/user/logout"); // Clear cookie on the backend
    enqueueSnackbar("Logout Successfull!!", { variant: "success" });
    setUser(null); // Remove user from state
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        loading,
        message,
        user,
        requestResetPassword,
        resetPassword,
        logout,
        fetchTasks,
        updateTaskStatus,
        tasks,
        requestDeadline,
        authLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

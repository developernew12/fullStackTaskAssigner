import { createContext, useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import instance from "../services/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  // ✅ Verify logged-in user on page load
  useEffect(() => {
    const verifyUser = async () => {
      console.log("AuthContext: Verifying user...");
      setLoading(true);

      try {
        const userRes = await instance.get("/user/verify-user");
        console.log("User Verified:", userRes.data);
        setUser(userRes.data.user);
      } catch (error) {
        console.log("User Verification Error:", error);
        setUser(null);
      }

      setLoading(false);
    };

    verifyUser();
  }, []);

  // ✅ Login Function (Accepts navigate as a parameter)
  const login = async (email, password, isAdmin = false, navigate) => {
    setLoading(true);

    try {
      const endpoint = isAdmin ? "/admin/login" : "/user/login";
      console.log("Login Attempt:", endpoint);

      const res = await instance.post(endpoint, { email, password });

      enqueueSnackbar(res.data.message, { variant: "success" });
      setUser(res.data.user || res.data.admin);

      // ✅ Redirect user after successful login
      navigate(
        res.data.user?.role === "admin"
          ? "/admin/dashboard"
          : "/user/dashboard"
      );

      return true;
    } catch (error) {
      console.error("Login Error:", error);
      enqueueSnackbar(error.response?.data?.message || "Login failed", {
        variant: "error",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register New User
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await instance.post("/user/register", {
        name,
        email,
        password,
      });

      enqueueSnackbar(res.data.message, { variant: "success" });

      return true; // ✅ Return true if registration succeeds
    } catch (error) {
      console.log("Register Error:", error);
      enqueueSnackbar(error.response?.data?.message || "Registration failed", { variant: "error" });

      return false;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await instance.post("/user/logout");
      setUser(null);
      enqueueSnackbar("Logged out successfully", { variant: "success" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ✅ Request Password Reset
  const requestResetPassword = async (email) => {
    setLoading(true);
    try {
      await instance.post("/user/reset-password-request", { email });
      enqueueSnackbar("Password reset link sent to your email", { variant: "success" });
    } catch (error) {
      console.log("Reset Password Request Error:", error);
      enqueueSnackbar(error.response?.data?.message || "An error occurred", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset Password
  const resetPassword = async (password, token) => {
    setLoading(true);
    try {
      await instance.post("/user/reset-password", {
        token,
        newPassword: password,
      });
      enqueueSnackbar("Password reset successfully", { variant: "success" });
    } catch (error) {
      console.log("Reset Password Error:", error);
      enqueueSnackbar(error.response?.data?.message || "An error occurred", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login, // ✅ Now requires navigate to be passed from components
        register,
        logout,
        requestResetPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./layouts/first/First";
import Home from "./pages/home/Home";
import UserLogin from "./pages/userLogin/UserLogin";
import AdminLogin from "./pages/adminLogin/AdminLogin";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import NotFound from "./pages/notFound/NotFound";
import ProtectedUserRoute from "./routes/ProtectedUserRoute";
import UserLayout from "./layouts/userLayout/UserLayout";
import UserDashBoard from "./pages/userDash/UserDashBoard";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import AdminDashboard from "./pages/adminDash/AdminDashboard";
import AuthProvider from "./context/AuthContext";
import "./App.css";
import AdminLayout from "./layouts/adminlayout/AdminLayout";
import Register from "./pages/register/Register";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import RequestResetPassword from "./pages/requestResetPass/RequestResetPassword";
import { SnackbarProvider } from "notistack";
const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/userLogin",
        element: <UserLogin />,
      },
      {
        path: "/adminLogin",
        element: <AdminLogin />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "/requestResetPassword",
        element: <RequestResetPassword />,
      },
      {
        path: "/register-user",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/user/dashboard",
        element: (
          <ProtectedUserRoute>
            <UserLayout>
              <UserDashBoard />
            </UserLayout>
          </ProtectedUserRoute>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedAdminRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedAdminRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </SnackbarProvider>
  );
};

export default App;

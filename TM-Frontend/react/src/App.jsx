import React from 'react'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import First from './layouts/first/First';
import Home from './pages/home/Home';
import UserLogin from './pages/userLogin/UserLogin';
import AdminLogin from './pages/adminLogin/AdminLogin';
import VerifyEmail from './pages/verifyEmail/VerifyEmail';
import NotFound from './pages/notFound/NotFound';
import ProtectedUserRoute from './routes/ProtectedUserRoute';
import UserLayout from './layouts/userLayout/UserLayout';
import UserDashBoard from './pages/userDash/UserDashBoard';
import ProtectedAdminRoute from './routes/ProtectedAdminRoute';
import AdminDashboard from './pages/adminDash/AdminDashboard';
import AuthProvider from './context/AuthContext';
import "./App.css";
import AdminLayout from './layouts/adminlayout/AdminLayout';

const router = createBrowserRouter([
  {
    path:"/",
    element:<First />,
    children:[
      {
        index:true,
        element:<Home />,
      },
      {
        path:"/userLogin",
        element:<UserLogin />,
      },
      {
        path:"/adminLogin",
        element:<AdminLogin />,
      },
      {
        path:"/verify-email",
        element:<VerifyEmail />,
      },
      {
        path:"*",
        element:<NotFound />,
      },
      {
        path:"/user/dashboard",
        element:(
          <ProtectedUserRoute>
            <UserLayout>
              <UserDashBoard/>
            </UserLayout>
          </ProtectedUserRoute>
        )
      },
      {
        path:"/admin/dashboard",
        element:(
          <ProtectedAdminRoute>
            <AdminLayout>
              <AdminDashboard/>
            </AdminLayout>
          </ProtectedAdminRoute>
        )
      }
    ]
  }
])

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App

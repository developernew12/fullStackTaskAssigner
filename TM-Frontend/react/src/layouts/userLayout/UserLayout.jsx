import React, { useContext } from 'react'
import UserHeader from '../../components/userHeader/UserHeader'
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const UserLayout = ({children}) => {
  const { darkMode } = useContext(AuthContext);
  return (
    <div className={darkMode ? "dark-layout" : ""}>
      <UserHeader/>
      <Outlet/>
    </div>
  )
}

export default UserLayout

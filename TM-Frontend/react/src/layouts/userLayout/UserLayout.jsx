import React from 'react'
import UserHeader from '../../components/userHeader/UserHeader'

const UserLayout = ({children}) => {
  return (
    <div>
      <UserHeader/>
      <main>{children}</main>
    </div>
  )
}

export default UserLayout

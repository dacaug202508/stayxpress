import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../common/CommonNavbar'
import CommonNavbar from '../common/CommonNavbar'

function Layout() {
  return (
    <div>

 <CommonNavbar />
 <Outlet />

    </div>
  )
}

export default Layout
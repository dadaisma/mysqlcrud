import React from 'react'
import { ToastContainer } from 'react-toastify'
import NavBar from './NavBar'


const Layout = ({children}) => {
  return ( 
  <>
  <NavBar />

  <div className='bg-gray-100 h-screen p-10'>
  <div className='container mx-auto h-full'>
    {children}

  </div>
  </div>
  <ToastContainer />
  </>
)}

export default Layout
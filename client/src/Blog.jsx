import React from 'react'
import { Outlet } from 'react-router-dom'
import Login from './pages/Login'

const Blog = () => {
  return (
    <>
    <h1>welcome to blog looking smaart
    </h1>   
        <Outlet/>
    
    </>
  )
}

export default Blog
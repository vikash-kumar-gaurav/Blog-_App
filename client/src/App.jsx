import { useEffect, useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import { login, logOut } from './Redux/featers/userSlice'

import { useDispatch } from 'react-redux'
import userApi from './utils/userApi'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    fetchDetails()
  },[])

  const fetchDetails = async() => {
    try {
      const response = await userApi.get('/auth-check')
      console.log('response from app.js',response.data);
      if(response.data?.userData){
        dispatch(login(response.data?.userData))
        
      }
      
    } catch (error) {
      console.log('error from app js',error);
      
    }
  }

  return (
    <>
      <Toaster 
      position="top-center"
      reverseOrder={true}
      />
      <Navbar />
      <Outlet />
      
    </>
  )
}

export default App

import { useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(true)

  return (
    <>
      <Toaster 
      position="top-center"
      reverseOrder={true}
      />
      <Navbar isLoggedIn={isLoggedIn} setisLoggedIn= {setisLoggedIn}/>
      <Outlet />
      
    </>
  )
}

export default App

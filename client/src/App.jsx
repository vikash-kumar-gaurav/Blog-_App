import { useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster 
      position="top-center"
      reverseOrder={true}
      />
      <Navbar/>
      <Outlet/>
      
    </>
  )
}

export default App

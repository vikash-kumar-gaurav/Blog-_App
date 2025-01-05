import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster 
      position="top-center"
      reverseOrder={true}
      />
      <h1>hello there from here below will be ahown according to uel</h1>
      <Outlet/>
      
    </>
  )
}

export default App

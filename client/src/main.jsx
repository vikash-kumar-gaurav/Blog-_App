import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Toaster from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import router from './routes/userRoutes.jsx'


createRoot(document.getElementById('root')).render(
 
  
  <RouterProvider router={router}/>
  
  
 
)

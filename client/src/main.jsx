import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Toaster from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import router from './routes/userRoutes.jsx'
import { Provider } from 'react-redux'
import store from './Redux/store/store.js'


createRoot(document.getElementById('root')).render(
 
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  
  
  
 
)

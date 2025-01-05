import { createBrowserRouter } from 'react-router-dom'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import Login from '../pages/Login'
import App from '../App.jsx'

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<Home/>,

            },
            {
                path:'/login',
                element:<Login/>
            },{
                path:'/register',
                element:<Signup/>
            }
        ]

    }
])

export default router

import { createBrowserRouter } from 'react-router-dom'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import Login from '../pages/Login'
import App from '../App.jsx'
import Blog from '../Blog.jsx'
import CreateBlog from '../pages/newBlog.jsx'

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

    },
    {
        path:'/blog',
        element:<Blog/>,
        children:[
            {
                path:'blog-create',
                element:<CreateBlog/>
            },
        ]
    }
])

export default router

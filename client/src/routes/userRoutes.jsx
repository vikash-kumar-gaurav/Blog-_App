import { createBrowserRouter } from 'react-router-dom'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import Login from '../pages/Login'
import App from '../App.jsx'
import Blog from '../pages/Blog.jsx'
import CreateBlog from '../pages/newBlog.jsx'
import ForgotPassword from '../pages/ForgotPassword.jsx'
import ChangePassword from '../pages/ChangePassword.jsx'
import UpdateUserDetails from '../pages/UpdateUserDetails.jsx'
import UserAllblogs from '../pages/UserAllblogs.jsx'

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
            },
            {
                path:'/blog/:id',
                element:<Blog/>
            },
            {
                path:'blog-create',
                element:<CreateBlog/>
            },
            {
                path:'/forgot-password',
                element:<ForgotPassword/>
            },
            {
                path:'/change-password',
                element:<ChangePassword/>
            },
            {
                path:'/update-userDetails',
                element:<UpdateUserDetails/>
            },
            {
                path:'/user-all-blogs',
                element:<UserAllblogs/>
            }

        ]

    },
   
])

export default router

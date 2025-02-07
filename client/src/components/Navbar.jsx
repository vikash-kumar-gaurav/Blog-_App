import React from "react";
import { Link } from "react-router-dom";
import logo from '/Group 2.png'
import { useSelector } from "react-redux";
import Loading from "../pages/Loading";
import '../index.css'
import UserProfileDropdown from "./UserProfileDropdown";

const Navbar = () => {
  // return (
  //   <div className="w-full max-h-18 ">
  //       <nav className="flex items-center justify-between px-8 py-6 bg-black backdrop-blur-md shadow-xl border-b border-gray-700 ">
  //     {/* Logo with Bounce Effect */}
  //     <Link to={'/'}>
  //     <div 
  //       className=" animate-bounce"
  //     >
  //       <img src={logo} style={{height:"60px"}}  />
  //     </div>
  //     </Link>

  //     {/* Right-side Section */}
  //     <div className="flex items-center space-x-10">
  //       {/* "Me" Section */}
  //       <div className="flex items-center space-x-2">
  //         <img
  //           src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
  //           alt="React Logo"
  //           className="w-8 h-8 animate-spin-slow"
  //         />
  //         <span className="text-lg font-semibold text-gray-300">Me</span>
  //       </div>

  //       {/* "All Blog" Section */}
  //       <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium text-sm transition transform hover:scale-105 hover:shadow-lg">
  //         All Blog
  //       </button>
  //     </div>
  //   </nav>
  //   </div>
  // );
 const{isLoggedIn,user} = useSelector((state) => state.user)
 console.log(isLoggedIn,user);
 const imageUrl = useSelector((state) => state.user?.user?.profilePicture)
 const role = useSelector((state) => state.user?.user?.role)
 const username = useSelector((state) => state.user?.user?.username)
 
 
  return(
    <>
    <div  className="h-auto w-full flex justify-between items-center border-2 border-black bg-black px-20 ">
      <div><Link to={'/'}><img src={logo} style={{height:'80px'}} /></Link></div>
      <div>
        {isLoggedIn ? (
         

          <div className="md:flex hidden items-center gap-6 font-medium " id="navcontainer">
            <button className="relative group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-red-600 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                <span className="relative z-10 px-6 py-2 text-white uppercase transition-colors duration-300 group-hover:text-gray-100">
                  <Link to={'/'}>Home</Link>
                </span>
            </button>

            <button className="relative group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-red-600 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                <span className="relative z-10 px-6 py-2 text-white uppercase transition-colors duration-300 group-hover:text-gray-100">
                  <Link to={'/blog-create'}>Create Blog</Link>
                </span>
            </button>

            <button className="relative group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-red-600 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                <span className="relative z-10 px-6 py-2 text-white uppercase transition-colors duration-300 group-hover:text-gray-100">
                  <Link to={'/user-all-blogs'}>View Your Blog</Link>
                </span>
           </button>

          </div>

        ) : (
          null
        )}
      </div>
      <div>
        <div >
          
          {isLoggedIn ? (
            // <div className="rounded-full w-20 h-20 m-auto pt-5">
            //   <img src={imageUrl}  alt="" className="rounded-full size-12"/>
            // </div>
            <UserProfileDropdown imageUrl={imageUrl} username={username} role={role}/>
          ) : (
            <>
            <button className="bg-blue-400 text-white font-extrabold px-6 py-2 rounded-md mr-5"><Link to={'/register'}>SignIn</Link></button>
            <button className="bg-blue-400 text-white font-extrabold px-6 py-2 rounded-md"><Link to={'/login'}>LogIn</Link></button>
            </>
          )}

        </div>
      </div>
    </div>
    </>
  )

};

export default Navbar;

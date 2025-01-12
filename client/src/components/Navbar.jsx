import React from "react";
import { Link } from "react-router-dom";
import logo from '/Group 2.png'

const Navbar = ({setisLoggedIn,isLoggedIn}) => {
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

  return(
    <>
    <div className="h-auto w-full flex justify-between items-center border-2 border-black bg-black px-20">
      <div><Link to={'/'}><img src={logo} style={{height:'80px'}} /></Link></div>
      <div>
        {isLoggedIn ? (
          <div className="md:block hidden">
            <ul className="gap-4 text-white flex underline">
              <li><Link to={'/'}>Home</Link></li>
              <li><Link to={'/blog-create'}>Create Blog</Link></li>
              <li><Link to={'/view-blogs'}>View Your Blog</Link></li>
              
            </ul>
          </div>
        ) : (
          null
        )}
      </div>
      <div>
        <div >
          
          {isLoggedIn ? (
            <div className="rounded-full w-20 h-20">
              <img src={logo} style={{height:'80px'}} alt="" />
            </div>
          ) : (
            <button className="bg-blue-400 text-white font-extrabold px-6 py-2 rounded-md"><Link to={'/login'}>LogIn</Link></button>
          )}

        </div>
      </div>
    </div>
    </>
  )

};

export default Navbar;

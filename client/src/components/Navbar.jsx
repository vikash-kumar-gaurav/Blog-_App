import React from "react";
import { Link } from "react-router-dom";
import logo from '/Group 2.png'
import { useSelector } from "react-redux";
import Loading from "../pages/Loading";

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
 
 
  return(
    <>
    <div className="h-auto w-full flex justify-between items-center border-2 border-black bg-black px-20">
      <div><Link to={'/'}><img src={logo} style={{height:'80px'}} /></Link></div>
      <Loading/>
      <div>
        {isLoggedIn ? (
          <div className="md:block hidden text-white gap-5">

            <button className="h-10 rounded-md bg-blue-500 font-bold pt-2 mr-5 pb-4 overflow-hidden hover:bg-rose-600"><Link to={'/'}>Home</Link></button>
            <button className="h-10 rounded-md bg-blue-500 font-bold pt-2 mr-5 pb-4 overflow-hidden hover:bg-rose-600"><Link to={'/blog-create'}>Create Blog</Link></button>
            <button className="h-10 rounded-md bg-blue-500 font-bold pt-2 mr-5 pb-4 overflow-hidden hover:bg-rose-600"><Link to={'/user-all-blogs'}>View your Blog</Link></button>
          </div>
        ) : (
          null
        )}
      </div>
      <div>
        <div >
          
          {isLoggedIn ? (
            <div className="rounded-full w-20 h-20 m-auto pt-5">
              <img src={imageUrl}  alt="" className="rounded-full size-12"/>
            </div>
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

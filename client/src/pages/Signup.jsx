import React, { useState } from 'react'

import userApi from '../utils/userApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { VscEyeClosed } from "react-icons/vsc";
import { FaEye } from "react-icons/fa";


const Signup = () => {
    const[data,setdata] = useState({email:"",username:"",password:"",name:"",confirmPassword:""})
    const[password,setpassword] = useState(false)
    const[confirm_password,setconfirm_password] = useState(false)
    const navigate = useNavigate()
    const handleChange  = (e)=>{
        setdata((previous)=>(
            {
                ...previous,
                [e.target.name]:e.target.value
            }
        ))
    }
    const validValue = (
        data.email.trim() !== '' &&
        data.username.trim() !== '' &&
        data.password.trim() !== '' &&
        data.name.trim() !== '' &&
        data.confirmPassword.trim() !== ''
    )
                     

    const handleSubmit =async (e)=>{
        e.preventDefault()
        
        
        try {

          if(data.password !== data.confirmPassword){
            toast.error("Password and confirm Password must be same");
            return null
          }

            const response = await userApi.post('/register',data)
            console.log(response.data);
            

            if(response.data.success){
                toast.success(response.data.msg)
                setTimeout(() => {
                    navigate('/')
                    setdata({
                        username:"",
                        email:"",
                        password:"",
                        confirmPassword:"",
                        name:""
                    })
                }, 1500);
            }else{
                toast.error(response.data.msg)
                setTimeout(() => {
                    
                    setdata({
                        username:"",
                        email:"",
                        password:"",
                        confirmPassword:"",
                        name:""
                    })
                }, 1500);
            }
        } catch (error) {
          console.log('error from catch',error);
          toast.error(error.response ? error.response.data.msg : error.msg)
            
        }
        
        
    }
  return (

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg border border-gray-600">
        <p className="text-center text-2xl font-semibold text-gray-200 mb-6">
          Hey Buddy, new to Bloog? Don&apos;t panic, it&apos;s so simple!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              name="name"
              required
              onChange={handleChange}
              placeholder="Ex - Vikash Kumar"
              className="mt-2 w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="username" className="block text-sm font-medium text-gray-400">
              Username
            </label>
            <input
              type="text"
              value={data.username}
              name="username"
              required
              onChange={handleChange}
              placeholder="Ex - vikash02"
              className="mt-2 w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              type="email"
              placeholder="vikash@gmail.com"
              required
              name="email"
              value={data.email}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div className="mb-5 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              value={data.password}
              name="password"
              required
              placeholder="Vik@4854"
              className="mt-2 w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
            <span
              onClick={() => setpassword((prev) => !prev)}
              className="absolute top-9 right-4 text-gray-400 cursor-pointer"
            >
              {password ? <VscEyeClosed /> : <FaEye />}
            </span>
          </div>
          <div className="mb-6 relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="vik@4854"
              required
              value={data.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
            <span
              onClick={() => setconfirm_password((prev) => !prev)}
              className="absolute top-9 right-4 text-gray-400 cursor-pointer"
            >
              {confirm_password ? <VscEyeClosed /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            disabled={!validValue}
            className={`w-full px-4 py-2 text-white font-semibold rounded-lg transition-all duration-200 ${
              validValue
                ? 'bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400'
                : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
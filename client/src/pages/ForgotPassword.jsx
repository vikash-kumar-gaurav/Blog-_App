import React, { useState,  } from 'react'
import axios from 'axios'
import userApi from '../utils/userApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const[email,setEmail] = useState('')
    const[otp,setotp] = useState('')
    const navigate = useNavigate()

    const handleOtpSubmit = async (e) => {
        e.preventDefault()
        
        
        try {
          
          
            const response = await userApi.post('/submit-otp',{email,otp})
            if(response.data?.success){
              toast.success(response.data?.msg)
              navigate('/change-password',{state:email})
              
            }
            
            
        } catch (error) {
          console.log(error.response?.data.msg);

        if(error.response?.data.msg)
          toast.error(error.response?.data.msg)
        else toast.error("server error try later")
        }


    }

    const handleMailSubmit =async (e) => {
        e.preventDefault()
        try {
            const response = await userApi.post('/forgot-password',{ email })
            
            
            if(response.data?.success){
                toast.success(response.data?.msg)

            } 
            
        } catch (error) {
           
           
            if(error.response?.data?.msg){
                toast.error(error.response?.data?.msg)
            } else {
                toast.error("Server Error try after sometime")
            }
            
            
            
            
        }
        
    }
  return (
    <>
  <div className="flex justify-center items-center h-screen bg-gray-900">
    <div className="w-80 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
      <form action="" onSubmit={handleMailSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Get OTP
        </button>
      </form>

      <form action="" onSubmit={handleOtpSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-300">
            OTP
          </label>
          <input
            type="text"
            placeholder="Enter OTP"
            required
            value={otp}
            name="otp"
            onChange={(e) => setotp(e.target.value)}
            className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit OTP
        </button>
      </form>
    </div>
  </div>
</>

  )
}

export default ForgotPassword
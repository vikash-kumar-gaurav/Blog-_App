import React from 'react'
import { useState } from 'react'
import { VscEyeClosed } from "react-icons/vsc";
import { FaEye } from "react-icons/fa";
import userApi from '../utils/userApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const[data,setdata] = useState({email:"",password:"",confirmPassword:""})
    const[password,setpassword]= useState(false)
    const[confirmPassword,setconfirmPassword]= useState(false)
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
        data.password.trim() !== '' &&
        data.confirmPassword.trim() !== ''
    )
                     

    const handleSubmit =async (e)=>{
        e.preventDefault()
        
        try {

            if(data.confirmPassword !== data.password){
                toast.error("password and confirm password must be same")
             return null
            }
            const response = await userApi.post('/login',data)

            

            if(response.data.success){ //manage success true
                console.log(response.data);
                
                toast.success(response.data.msg)
                setTimeout(() => {
                    setdata({
                        email:"",
                        password:"",
                        confirmPassword:""
                    })
                    navigate('/')
                }, 1500);
            } else {                  // manage success is false
                toast.error(response.data.msg)
                setdata({
                    email:"",
                    password:"",
                    confirmPassword:""
                })
            }

        } catch (error) {
            console.log(error);
            if(error.response){
                toast.error(error.response.data?.msg)
            }else {
                toast.error("An unexpected error occured")
            }
            
        }
        
    }
  return (
    



<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-400">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <p className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Welcome back, buddy! Tumahar bhi kat hi gaya, koi nai blog padho ab!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="vikash@gmail.com"
              required
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition duration-200 ease-in-out"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="flex items-center">
              <input
                type={password ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Vik@4854"
                required
                value={data.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition duration-200 ease-in-out"
              />
              <span
                onClick={() => setpassword((prev) => !prev)}
                className="absolute right-3 text-gray-500 hover:text-indigo-500 cursor-pointer"
              >
                {password ? <FaEye size={18} /> : <VscEyeClosed size={18} />}
              </span>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="flex items-center">
              <input
                type={confirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="vik@4854"
                required
                value={data.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition duration-200 ease-in-out"
              />
              <span
                onClick={() => setconfirmPassword((prev) => !prev)}
                className="absolute right-3 text-gray-500 hover:text-indigo-500 cursor-pointer"
              >
                {confirmPassword ? <FaEye size={18} /> : <VscEyeClosed size={18} />}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!validValue}
            className={`w-full px-4 py-3 font-semibold rounded-lg transition duration-200 ease-in-out shadow-md ${
              validValue
                ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </form>

        {/* Navigation to Register */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-indigo-500 font-semibold hover:underline hover:text-indigo-600 transition duration-200 ease-in-out"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  
  )
} 

export default Login
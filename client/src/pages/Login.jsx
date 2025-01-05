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
                // setTimeout(() => {
                //     setdata({
                //         email:"",
                //         password:"",
                //         confirmPassword:""
                //     })
                //     navigate('/')
                // }, 1500);
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
    

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-blue-200">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <p className="text-center text-2xl font-semibold text-gray-700 mb-8">Welcome back, buddy! Tumahar bhi kat hi gaya, koi nai blog padho ab!</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="vikash@gmail.com"
                            required
                            value={data.email}
                            onChange={handleChange}
                            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                        />
                    </div>

                    
                    <div>
                        <div className="mb-4">
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
                        <input
                            type={password?"text":"password"}
                            id="password"
                            name="password"
                            placeholder="Vik@4854"
                            required
                            value={data.password}
                            onChange={handleChange}
                            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                        />
                    </div>
                    <span onClick={()=>setpassword((prev)=>!prev)}>{password?<FaEye/>:<VscEyeClosed/>}</span>

                    
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">Confirm Password</label>
                        <input
                            type={confirmPassword?"text":"password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="vik@4854"
                            required
                            value={data.confirmPassword}
                            onChange={handleChange}
                            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                        />
                    </div>
                    <span onClick={()=>setconfirmPassword((prev)=>!prev)}>{confirmPassword?<FaEye/>:<VscEyeClosed/>}</span>
                    </div>

                    
                    <button
                        type="submit"
                        disabled={!validValue}
                        className={`w-full px-4 py-3 text-white font-semibold rounded-lg transition duration-200 ease-in-out ${validValue ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
  )
} 

export default Login
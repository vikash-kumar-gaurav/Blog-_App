import React, { useState } from 'react'
import axios from 'axios'


const Signup = () => {
    const[data,setdata] = useState({email:"",username:"",password:"",name:"",confirmPassword:""})
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
        const response = await axios.post('http://localhost:8080/api/v1/user/register',data)
        console.log(response.data);
        
    }
  return (
    

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-200">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-center text-xl font-semibold text-gray-700 mb-6">Hey Buddy, new to Bloog? Don't panic, it's so simple!</p>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Full Name</label>
                <input 
                    type="text" 
                    id="name" 
                    value={data.name} 
                    name="name" 
                    required 
                    onChange={handleChange} 
                    placeholder="Ex - Vikash Kumar" 
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                <input 
                    type="text" 
                    value={data.username} 
                    name="username" 
                    required 
                    onChange={handleChange} 
                    placeholder="Ex - vikash02" 
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <input 
                    type="email" 
                    placeholder="vikash@gmail.com" 
                    required 
                    name="email" 
                    value={data.email} 
                    onChange={handleChange} 
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                <input 
                    type="password" 
                    onChange={handleChange} 
                    value={data.password} 
                    name="password" 
                    required 
                    placeholder="Vik@4854" 
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
                <input 
                    type="password" 
                    placeholder="vik@4854" 
                    required 
                    value={data.confirmPassword} 
                    name="confirmPassword" 
                    onChange={handleChange} 
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <button 
                type="submit" 
                disabled={!validValue} 
                className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${validValue ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-gray-400 cursor-not-allowed'}`}
            >
                Submit
            </button>
        </form>
    </div>
</div>

  )
}

export default Signup
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { VscEyeClosed } from "react-icons/vsc";
import { FaEye } from "react-icons/fa";
import userApi from '../utils/userApi';
import toast from 'react-hot-toast';

const ChangePassword = () => {
    
    const[showpassword,setshowpassword] = useState(false)
    const[showconfirm_password,setshowconfirm_password] = useState(false)
    const[data,setdata] = useState({password:'',confirm_password:''})
    const navigate = useNavigate()
    const location = useLocation()
    if(!location?.state){
      toast.error("verify first")
      navigate('/forgot-password')
    }
    const email = location?.state;
    console.log(location?.state);
    
    

    

    const handleChange = (e) => {
        const { value,name } = e.target
        setdata((prev) => (
            {
                ...prev,
                [name]:value
            }
        ))
    }

    const submitHandler = async(e) => {
        e.preventDefault()
        try {
            const password = data.password
            const confirm_password = data.confirm_password
            const response = await userApi.post('/change-password',{email, password, confirm_password})
            console.log(response);
            if(response.data?.success){
            navigate('/login',{replace:true}) //the replace will crear the location.state
                toast.success(response.data?.msg)
                
            }
            
        } catch (error) {
            console.log(error.response?.data?.msg);
            if(error.response?.data?.msg){
                toast.error(error.response?.data?.msg)
            } else toast.error("Server Error please try again later")
            
        }
    }
    const validValues = data.password.trim() !== '' &&
                        data.confirm_password.trim() !== '';
  return (
    <>
  <form
    action=""
    onSubmit={submitHandler}
    className="space-y-6 max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow-lg"
  >
    {/* New Password Field */}
    <div className="relative">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-300"
      >
        New Password
      </label>
      <input
        type={showpassword ? "text" : "password"}
        onChange={handleChange}
        required
        placeholder="New Password"
        value={data.password}
        name="password"
        className="w-full px-4 py-2 pr-10 mt-1 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span
        className="absolute top-2/4 right-3 transform -translate-y-2/4 cursor-pointer text-gray-600 hover:text-gray-800"
        onClick={() => setshowpassword(!showpassword)}
      >
        {showpassword ? <VscEyeClosed /> : <FaEye />}
      </span>
    </div>

    {/* Confirm Password Field */}
    <div className="relative">
      <label
        htmlFor="confirm_password"
        className="block text-sm font-medium text-gray-300"
      >
        Confirm Password
      </label>
      <input
        type={showconfirm_password ? "text" : "password"}
        onChange={handleChange}
        required
        placeholder="Confirm Password"
        value={data.confirm_password}
        name="confirm_password"
        className="w-full px-4 py-2 pr-10 mt-1 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <span
        className="absolute top-2/4 right-3 transform -translate-y-2/4 cursor-pointer text-gray-600 hover:text-gray-800"
        onClick={() => setshowconfirm_password(!showconfirm_password)}
      >
        {showconfirm_password ? <VscEyeClosed /> : <FaEye />}
      </span>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={
        !data.password ||
        !data.confirm_password ||
        data.password !== data.confirm_password
      }
      className={`w-full px-4 py-2 mt-4 text-white font-medium rounded-md ${
        validValues
          ? "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          : "bg-gray-500 cursor-not-allowed"
      }`}
    >
      Submit
    </button>
  </form>
</>

  )
}

export default ChangePassword
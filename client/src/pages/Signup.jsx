// import React, { useState } from 'react'

// import userApi from '../utils/userApi'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
// import { VscEyeClosed } from "react-icons/vsc";
// import { FaEye } from "react-icons/fa";


// const Signup = () => {
//     const[data,setdata] = useState({email:"",username:"",password:"",name:"",confirmPassword:""})
//     const[password,setpassword] = useState(false)
//     const[confirm_password,setconfirm_password] = useState(false)
//     const navigate = useNavigate()
//     const handleChange  = (e)=>{
//         setdata((previous)=>(
//             {
//                 ...previous,
//                 [e.target.name]:e.target.value
//             }
//         ))
//     }
//     const validValue = (
//         data.email.trim() !== '' &&
//         data.username.trim() !== '' &&
//         data.password.trim() !== '' &&
//         data.name.trim() !== '' &&
//         data.confirmPassword.trim() !== ''
//     )
                     

//     const handleSubmit =async (e)=>{
//         e.preventDefault()
        
        
//         try {

//           if(data.password !== data.confirmPassword){
//             toast.error("Password and confirm Password must be same");
//             return null
//           }

//             const response = await userApi.post('/register',data)
//             console.log(response.data);
            

//             if(response.data.success){
//                 toast.success(response.data.msg)
//                 setTimeout(() => {
//                     navigate('/')
//                     setdata({
//                         username:"",
//                         email:"",
//                         password:"",
//                         confirmPassword:"",
//                         name:""
//                     })
//                 }, 1500);
//             }else{
//                 toast.error(response.data.msg)
//                 setTimeout(() => {
                    
//                     setdata({
//                         username:"",
//                         email:"",
//                         password:"",
//                         confirmPassword:"",
//                         name:""
//                     })
//                 }, 1500);
//             }
//         } catch (error) {
//           console.log('error from catch',error);
//           toast.error(error.response ? error.response.data.msg : error.msg)
            
//         }
        
        
//     }
//   return (

// <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg border border-gray-600">
//         <p className="text-center text-2xl font-semibold text-gray-200 mb-6">
//           Hey Buddy, new to Bloog? Don&apos;t panic, it&apos;s so simple!
//         </p>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-5">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-400">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={data.name}
//               name="name"
//               required
//               onChange={handleChange}
//               placeholder="Ex - Vikash Kumar"
//               className="mt-2 w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
//             />
//           </div>
//           <div className="mb-5">
//             <label htmlFor="username" className="block text-sm font-medium text-gray-400">
//               Username
//             </label>
//             <input
//               type="text"
//               value={data.username}
//               name="username"
//               required
//               onChange={handleChange}
//               placeholder="Ex - vikash02"
//               className="mt-2 w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
//             />
//           </div>
//           <div className="mb-5">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-400">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="vikash@gmail.com"
//               required
//               name="email"
//               value={data.email}
//               onChange={handleChange}
//               className="mt-2 w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
//             />
//           </div>
//           <div className="mb-5 relative">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-400">
//               Password
//             </label>
//             <input
//               type="password"
//               onChange={handleChange}
//               value={data.password}
//               name="password"
//               required
//               placeholder="Vik@4854"
//               className="mt-2 w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
//             />
//             <span
//               onClick={() => setpassword((prev) => !prev)}
//               className="absolute top-9 right-4 text-gray-400 cursor-pointer"
//             >
//               {password ? <VscEyeClosed /> : <FaEye />}
//             </span>
//           </div>
//           <div className="mb-6 relative">
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               placeholder="vik@4854"
//               required
//               value={data.confirmPassword}
//               name="confirmPassword"
//               onChange={handleChange}
//               className="mt-2 w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
//             />
//             <span
//               onClick={() => setconfirm_password((prev) => !prev)}
//               className="absolute top-9 right-4 text-gray-400 cursor-pointer"
//             >
//               {confirm_password ? <VscEyeClosed /> : <FaEye />}
//             </span>
//           </div>
//           <button
//             type="submit"
//             disabled={!validValue}
//             className={`w-full px-4 py-2 text-white font-semibold rounded-lg transition-all duration-200 ${
//               validValue
//                 ? 'bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400'
//                 : 'bg-gray-500 cursor-not-allowed'
//             }`}
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Signup

// import React, { useState } from 'react'

// const Signup = () => {
//   const[data,setdata] = useState({
//     name:"",
//     username:"",
//     profilePicture:"",
//     email:"",password:"",
//     confirm_password:""
//   })

//   const[peviewImage,setPreviewImage] = useState('')
//   const submitHandler = async () => {
//     try {
      
//     } catch (error) {
      
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
//       <form
//         className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Update Your Details
//         </h2>

//         {/* Profile Picture Section */}
//         <div className="flex flex-col items-center mb-6">
//           {previewImage ? (
//             <img
//               src={previewImage}
//               alt="Profile Preview"
//               className="w-24 h-24 rounded-full object-cover mb-3"
//             />
//           ) : (
//             <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
//               profile
//             </div>
//           )}
//           <label
//             htmlFor="profile_pic"
//             className="text-sm text-blue-600 cursor-pointer underline"
//           >
//             Profile Picture
//           </label>
//           <input
//             type="file"
//             id="profile_pic"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//         </div>

//         {/* Input Fields */}
//         <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//           Name
//         </label>
//         <input
//           type="text"
//           placeholder="Name"
//           value={data.name}
//           name="name"
//           required
//           onChange={handleChange}
//           className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-400"
//         />

//         <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
//           Bio
//         </label>
//         <textarea
//           value={userdata.bio}
//           name="bio"
//           placeholder="Bio"
//           required
//           onChange={handleChange}
//           className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-400"
//         />

//         <label
//           htmlFor="username"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Username
//         </label>
//         <input
//           type="text"
//           value={userdata.username}
//           name="username"
//           placeholder="Username"
//           required
//           onChange={handleChange}
//           className="block w-full border border-gray-300 rounded-lg p-2 mb-6 focus:outline-none focus:ring focus:ring-blue-400"
//         />

//         <button
//           type="submit"
//           disabled={!validValue}
//           className={`w-full py-2 rounded-lg text-white font-bold ${
//             validValue
//               ? "bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 hover:opacity-90"
//               : "bg-gray-300 cursor-not-allowed"
//           }`}
//         >
//           Update Details
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Signup
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    profilePicture: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const validValues = (
    data.name.trim() !== '' &&
    data.username.trim() !== '' &&
    data.email.trim() !== '' &&
    data.password.trim() !== '' &&
    data.confirmPassword.trim() !== '' &&
    data.password === data.confirmPassword
  );

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setData((prev) => ({
        ...prev,
        profilePicture: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validValues) {
      toast.error("Please check your details.");
      return;
    }

    // Here you would handle your form submission (e.g., call an API to register the user)
    toast.success("Registration successful!");
    setData({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobileNo: "",
      profilePicture: "",
    });
    setPreviewImage("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              Profile
            </div>
          )}
          <label
            htmlFor="profile_pic"
            className="text-sm text-blue-600 cursor-pointer underline"
          >
            Upload Profile Picture
          </label>
          <input
            type="file"
            id="profile_pic"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Input Fields */}
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Full Name"
          value={data.name}
          name="name"
          required
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-400"
        />

        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          placeholder="Username"
          value={data.username}
          name="username"
          required
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-400"
        />

        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          placeholder="Email Address"
          value={data.email}
          name="email"
          required
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-400"
        />

        <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
          Mobile No (Optional)
        </label>
        <input
          type="text"
          placeholder="Mobile No"
          value={data.mobileNo}
          name="mobileNo"
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-400"
        />

        {/* Password Fields */}
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative mb-4">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={data.password}
            name="password"
            onChange={handleChange}
            required
            className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <span
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute top-3 right-4 text-gray-400 cursor-pointer"
          >
            {passwordVisible ? '🙈' : '👁️'}
          </span>
        </div>

        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative mb-6">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            value={data.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            required
            className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <span
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            className="absolute top-3 right-4 text-gray-400 cursor-pointer"
          >
            {confirmPasswordVisible ? '🙈' : '👁️'}
          </span>
        </div>

        <button
          type="submit"
          disabled={!validValues}
          className={`w-full py-2 rounded-lg text-white font-bold ${
            validValues
              ? "bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 hover:opacity-90"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;

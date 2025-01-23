
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import userApi from '../utils/userApi'

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

     const response = await userApi.post('/register',data, {
      headers: {
        "Content-Type": "multipart/form-data", //use so that server will notify that the file is also comming
      }
    })
    console.log(data.name,data.password,data.confirmPassword,data.mobileNo,data.profilePicture,data.username)
    
    toast.success(response.data?.msg);
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

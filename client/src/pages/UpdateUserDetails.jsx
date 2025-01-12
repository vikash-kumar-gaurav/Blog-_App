
import React, { useEffect, useState } from "react";
import userApi from "../utils/userApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateUserDetails = () => {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState({
    name: "",
    username: "",
    bio: "",
    profilePicture: "",
  });
  const [previewImage, setPreviewImage] = useState(""); // Preview for profile picture

  // Fetch user details on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; //this will extract the file from the input field
    if (file) {
      const reader = new FileReader(); // this is js inbult function used to convert file into 64 bits machine code
      reader.onload = () => {          //if data is converted into machine code
        setPreviewImage(reader.result); // Update preview image
      };
      reader.readAsDataURL(file); //this will again convert code to image
    }
    setuserdata((prev) => ({
      ...prev,
      profilePicture: file, // Save file to state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); //js inbuilt object to make key value pair
      formData.append('name',userdata.name)
      formData.append('username',userdata.username)
      formData.append('bio',userdata.bio)
      formData.append('profilePicture',userdata.profilePicture)


      

      const response = await userApi.put('/update-userdetails', formData  , {
        headers: {
          "Content-Type": "multipart/form-data", //use so that server will notify that the file is also comming
        },
      }
    );
      console.log(response.data?.msg);
      toast.success(response.data?.msg);
    } catch (error) {
      console.error(error);
      toast.error("Error updating details.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await userApi.get("/getUser-details");
      const user = response?.data?.user;
      console.log(response?.data?.user);
      
      if (user) {
        setuserdata({
          name: user.Name || "",
          username: user.username || "",
          bio: user.bio || "",
          profilePicture: user.profilePicture || "",
        });
        setPreviewImage(user.profilePicture || ""); // Set preview for existing image
      }
    } catch (error) {
      if (!error.response?.data?.success) {
        toast.error(error.response?.data?.msg);
        navigate("/login");
      }
      console.error(error);
    }
  };

  const validValue =
    userdata.name.trim() !== "" &&
    userdata.username.trim() !== "" &&
    userdata.bio.trim() !== "";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Update Your Details
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
              No Image
            </div>
          )}
          <label
            htmlFor="profile_pic"
            className="text-sm text-blue-600 cursor-pointer underline"
          >
            Change Profile Picture
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
          Name
        </label>
        <input
          type="text"
          placeholder="Name"
          value={userdata.name}
          name="name"
          required
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-400"
        />

        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Bio
        </label>
        <textarea
          value={userdata.bio}
          name="bio"
          placeholder="Bio"
          required
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-400"
        />

        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          value={userdata.username}
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg p-2 mb-6 focus:outline-none focus:ring focus:ring-blue-400"
        />

        <button
          type="submit"
          disabled={!validValue}
          className={`w-full py-2 rounded-lg text-white font-bold ${
            validValue
              ? "bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 hover:opacity-90"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Update Details
        </button>
      </form>
    </div>
  );
};

export default UpdateUserDetails;

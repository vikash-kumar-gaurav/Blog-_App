import React, { useState } from "react";
import blogApi from "../utils/blogApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    tags: "",
    profilePicture: null,
    preview: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({
        ...prev,
        profilePicture: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("tags", data.tags);
      formData.append("profilePicture", data.profilePicture);

      const response = await blogApi.post("/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Blog added successfully!");
        setTimeout(() => {
          setData({
            title: "",
            content: "",
            tags: "",
            profilePicture: null,
            preview: "",
          });
          navigate(`/blog/${response.data.blog._id}`);
        }, 1500);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response ? error.response.data.msg : "Something went wrong!"
      );
      navigate("/login");
    }
  };

  const validValues = data.title.trim() !== "" && data.content.trim() !== "";

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h2 className="text-center text-2xl text-white mb-8">
          Share Your Thoughts ✨
        </h2>
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <label htmlFor="title" className="block text-white text-sm mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Ex: My Journey"
            className="w-full p-4 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            required
          />

          <label htmlFor="content" className="block text-white text-sm mb-2">
            Content
          </label>
          <textarea
            name="content"
            value={data.content}
            onChange={handleChange}
            placeholder="Write your story here..."
            rows="8"
            className="w-full p-4 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            required
          />

          <label htmlFor="image" className="block text-white text-sm mb-2">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full p-4 mb-4 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            onChange={handleImageChange}
          />
          {data.preview && (
            <div className="mb-4">
              <img
                src={data.preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          <label htmlFor="tags" className="block text-white text-sm mb-2">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={data.tags}
            onChange={handleChange}
            placeholder="Ex: journey, inspiration"
            className="w-full p-4 mb-6 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          />

          <button
            type="submit"
            className={`w-full py-4 text-lg rounded-lg text-white font-semibold ${
              validValues
                ? "bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800"
                : "bg-gray-500 cursor-not-allowed"
            } transition`}
            disabled={!validValues}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

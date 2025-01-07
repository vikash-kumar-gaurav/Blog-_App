
import React, { useState } from "react";
import blogApi from "../utils/blogApi";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'

const CreateBlog = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    tags: [],
    image: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await blogApi.post("/create", data);
      console.log(response.data.blog._id);
      
      

      if(response.data.success){
        
        toast.success("blog added")
        
        
        setTimeout(() => {
          setData({
            title: "",
            content: "",
            image: "",
            tags: [],
          });
          navigate(`/blog/${response.data?.blog?._id}`);
        }, 1500);
      } else{
        toast.error(response.data.msg);
        setData({
          title: "",
          content: "",
          image: "",
          tags: [],
        });
        navigate(`/blog`)
      }
    } catch (error) {
      console.log(error);
      
      toast.error(error.response ? error.response.data.msg : error.msg)
      navigate('/login')
      }
  };

  const validValues = data.title.trim() !== "" && data.content.trim() !== "";

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-800 to-black p-6">
      <div className="bg-white/20 backdrop-blur-xl p-6 rounded-xl shadow-lg w-full max-w-lg animate-fadeIn">
        <p className="text-center text-xl text-white mb-6">
          No one is judging you, so write honestly 🔥
        </p>
        <form onSubmit={submitHandler}>
          <label htmlFor="title" className="block text-white text-sm mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Ex: My Dark Side"
            className="w-full p-3 mb-4 rounded-lg border-none bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
            required
          />

          <label htmlFor="content" className="block text-white text-sm mb-2">
            Content
          </label>
          <textarea
            name="content"
            value={data.content}
            onChange={handleChange}
            placeholder="I like to keep things mysterious..."
            className="w-full p-3 mb-4 rounded-lg border-none bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
            required
          />

          <label htmlFor="Image" className="block text-white text-sm mb-2">
            Image
          </label>
          <input
            type="file"
            name="image"
            className="w-full p-3 mb-4 rounded-lg border-none bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-black transition"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                image: e.target.files[0],
              }))
            }
          />

          <label htmlFor="tags" className="block text-white text-sm mb-2">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={data.tags}
            onChange={handleChange}
            placeholder="mystery, darkness, rebellion"
            className="w-full p-3 mb-6 rounded-lg border-none bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
          />

          <button
            type="submit"
            className={`w-full py-3 text-lg rounded-lg text-white ${
              validValues
                ? "bg-gradient-to-r from-gray-600 to-black hover:from-gray-700 hover:to-black"
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

export default CreateBlog

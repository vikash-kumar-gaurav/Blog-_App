import React from 'react'
import { useNavigate } from 'react-router-dom'


const BlogCard = ({_id = 'Nhi pata', username = 'Ananomous', tags = [], comments = [], content ='aane mere janam', title='humko kuch nhi pata' , likes=[],image= '' }) => { //here all the object are pre saved so that it will not return undefined because async ko data lane mai time lagega
  const navigate = useNavigate()
  function handleClick(id){
    navigate(`/blog/${id}`);

  }
  return (

<div
  className="max-w-sm mx-auto p-6 bg-gray-800/70 backdrop-blur-xl border border-gray-700 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer "
  onClick={() => handleClick(_id)}
>
  <img
    src={
      image ||
      "https://imgs.search.brave.com/pQgtjoKpKC_KiS_xOcYgpAiCX2qL-283UjaC6l-x3zo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzA4LzQ3Lzc1/LzM2MF9GXzcwODQ3/NzUwOF9ETmt6Uklz/TkZnaWJnQ0o2S29U/Z0pqalJaTkpENG1i/NC5qcGc"
    }
    alt="Blog"
    className="w-full h-48 object-cover rounded-lg mb-4 shadow-md hover:brightness-110 transition-all duration-300"
  />
  <div className="text-center text-gray-200">
    <h1 className="text-2xl font-bold text-yellow-400 mb-3 tracking-wide hover:text-yellow-300 transition-colors duration-200">
      {title}
    </h1>
    <p className="text-sm mb-2">
      <strong className="text-gray-400">Author:</strong>{" "}
      <span className="text-gray-300">{username}</span>
    </p>
    <p className="text-sm mb-2">
      <strong className="text-gray-400">Content:</strong>{" "}
      <span className="line-clamp-2 text-gray-300">{content}</span>
    </p>
    <p className="text-sm mb-2">
      <strong className="text-gray-400">Likes:</strong>{" "}
      <span className="text-gray-300">{likes.length}</span>
    </p>
    <p className="text-sm mb-2">
      <strong className="text-gray-400">Tags:</strong>{" "}
      <span className="text-gray-300">{tags.join(", ") || "No tags"}</span>
    </p>
    <p className="text-sm">
      <strong className="text-gray-400">Comments:</strong>{" "}
      <span className="text-gray-300">{comments.join(", ") || "No Comment"}</span>
    </p>
  </div>
</div>


  )
}

export default BlogCard
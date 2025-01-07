import React from 'react'

const CreatedBlog = ({ username = 'Anonymous', content = 'No content available', title = 'Untitled', likes = [], tags = [],image='https://imgs.search.brave.com/pQgtjoKpKC_KiS_xOcYgpAiCX2qL-283UjaC6l-x3zo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzA4LzQ3Lzc1/LzM2MF9GXzcwODQ3/NzUwOF9ETmt6Uklz/TkZnaWJnQ0o2S29U/Z0pqalJaTkpENG1i/NC5qcGc' ,comments = [] }) => {
  return (
    <div className="max-w-sm mx-auto p-6 bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300">
      <img 
        src={image || "https://imgs.search.brave.com/pQgtjoKpKC_KiS_xOcYgpAiCX2qL-283UjaC6l-x3zo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzA4LzQ3Lzc1/LzM2MF9GXzcwODQ3/NzUwOF9ETmt6Uklz/TkZnaWJnQ0o2S29U/Z0pqalJaTkpENG1i/NC5qcGc"} 
        alt="Blog" 
        className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
      />
      <div className="text-center text-gray-200">
        <h1 className="text-2xl font-bold text-yellow-400 mb-2">{title}</h1>
        <p className="text-sm mb-2"><strong className="text-gray-400">Author:</strong> {username}</p>
        <p className="text-sm mb-2"><strong className="text-gray-400">Content:</strong> {content}</p>
        <p className="text-sm mb-2"><strong className="text-gray-400">Likes:</strong> {likes.length}</p>
        <p className="text-sm mb-2"><strong className="text-gray-400">Tags:</strong> {tags.join(', ') || 'No tags'}</p>
        <p className="text-sm"><strong className="text-gray-400">Comments:</strong> {comments.join(', ') || 'No Comment'}</p>
      </div>
    </div>
  )
}

export default CreatedBlog

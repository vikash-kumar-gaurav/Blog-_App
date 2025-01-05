import React from 'react'

const BlogCard = ({data}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {data.map((item, index) => (
    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Cd1ndZaTE7k0hRx3whjilc0SCTb3UrQCCA&s"
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800 truncate">{item.title}</h1>
        <p className="text-sm text-gray-600 mt-2">{item.content}</p>
        <p className="mt-4 text-xs text-gray-500">Author: Vikash</p>
      </div>
    </div>
  ))}
</div>

  )
}

export default BlogCard
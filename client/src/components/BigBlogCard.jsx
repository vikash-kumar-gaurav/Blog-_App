
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import blogApi from '../utils/blogApi'


const SingleBlogCard = ({
  _id = 'Nhi pata',
  username = 'Anonymous',
  likes = [],
  comments = [],
  content = 'Solid content',
  title = 'Wow',
  image = 'https://imgs.search.brave.com/8kwN061cgAWpvKSXBhLE47hkZGaURSvPm3EXX2_qV3U/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw'
}) => {
  const containerRef = useRef(null);
  const [likesCount, setlikesCount] = useState(likes.length)
  
  console.log(_id);
  

  useEffect(() => {
    // GSAP animations
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  const handleLike = async() => {
    try {
      const response = await blogApi.post('/likes',{_id})
      console.log(response.data);
       const numOfLike = response?.data?.likes
      setlikesCount(numOfLike.length)
      
      if(response.data?.success){
        console.log(response.data?.msg);
        
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div
      className="w-full min-h-screen bg-black bg-no-repeat bg-center pt-10"
      
    >
      <div
        ref={containerRef}
        className="max-w-[1200px] w-[90%] mx-auto border-4 text-white border-white rounded-lg flex flex-col lg:flex-row overflow-hidden shadow-lg"
      >
        {/* Image Section */}
        <div className="flex-1 bg-gray-800">
          <img
            src={image}
            alt="Blog visual"
            className="w-full h-full object-cover"
            style={{ maxHeight: '600px' }}
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-6 bg-gray-900">
          {/* Blog Title */}
          <h1 className="text-4xl font-bold mb-4 text-orange-400">{title}</h1>
          
          {/* Blog Metadata */}
          <p className="text-lg text-gray-300 mb-6">
            <strong>Author:</strong> {username}
          </p>

          {/* Blog Content */}
          <p className="text-base text-gray-400 mb-6">{content}</p>

          {/* Like and Comment Section */}
          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center space-x-3">
              <button className="text-green-400 hover:text-green-500 transition duration-300  active:scale-90" onClick={handleLike}>
                👍 {likesCount} Likes
                
              </button>
              <button className="text-blue-400 hover:text-blue-500 transition duration-300">
                💬 {comments.length} Comments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogCard;

import React, { useEffect, useState } from 'react';
import blogApi from '../utils/blogApi';
import Loading from './Loading';
import BlogCard from '../components/BlogCard';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await blogApi.get('/allblogs');
      console.log(response.data.blogs);

      setData(response.data.blogs); // Set blog data
    } catch (error) {
      console.error(error);
      setData([]); // Reset data on error
    } finally {
      setLoading(false);
    }
  }

  return (
    <div 
      className='bg-[url("https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjJ6eHEzeDVvbXE4Y3c3Zmtrejk2dWUyYTh6OGsyc2lzZHFrbDFmaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TW8Ma1a8ZsZ8I/giphy.gif")]
                bg-cover bg-center max-h-screen min-w-screen overflow-scroll flex gap-3 flex-wrap pt-15 min-h-screen'
    >
      {loading ? (
        <Loading />
      ) : data.length > 0 ? (
        data.map((blog) => (
          <BlogCard
            key={blog._id} // Unique key for each blog
            title={blog.title}
            content={blog.content}
            likes={blog.likes}
            tags={blog.tags}
            username={blog.author?.username}
            _id={blog._id}
            comments={blog.comments}
            image={blog.image}
          />
          
        ))
      ) : (
        <p className="text-center text-gray-600 mt-10">No blogs available</p>
      )}
    </div>
  );
};

export default Home;

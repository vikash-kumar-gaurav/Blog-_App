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
      className='bg-[url("https://images.unsplash.com/photo-1498674202614-ac0172c6c61a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]
                bg-cover bg-center max-h-screen min-w-screen overflow-scroll flex gap-3 flex-wrap pt-15 min-h-screen justify-center items-center'
    >
      {loading ? (
        <Loading />
      ) : data?.length > 0 ? (
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

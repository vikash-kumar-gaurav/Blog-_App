import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import blogApi from '../utils/blogApi'
import { useEffect } from 'react'
import Loading from './Loading'
import CreatedBlog from '../components/CreatedBlog'
import SingleBlogCard from '../components/BigBlogCard'

const Blog = () => {
  const { id } = useParams()
  const[data,setdata] = useState(null)
  
  const[loading,setloading] = useState(false)
  
  

  useEffect(()=>{
    fetchData()
  },[])

  async function fetchData() {
    try {
      setloading(true)
      const response = await blogApi.get(`/blog/${id}`)
      setdata(response.data.blog)
      
      
      console.log('blog Data :',response.data.blog);
      
    } catch (error) {
      setdata(null)
      console.log('error fetching blog data :',error);
      
    } finally {
      setloading(false)
    }
    
  }
  if (loading) {
    return (
      <>
       <div className='flex justify-center items-center'>
        <Loading/>
       </div>
      </>
    )
  }

  if (!data) {
    return <p>Blog not found or an error occurred.</p> // Handle no data case
  }

  return (
    <>
    
    <SingleBlogCard
     title={data.title}
     username={data.author?.username}
     content={data.content}
     likes={data.likes}
     tags={data.tags}
     image={data.image}
     comments={data.comments}
     _id= {data._id}
    
    />
    </>
  )
}

export default Blog
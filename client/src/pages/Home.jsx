import React, { useEffect, useState } from 'react'
import blogApi from '../utils/blogApi'
import Loading from './Loading'
import BlogCard from '../components/BlogCard'

const Home = () => {
  const[data,setdata] = useState([])
  const[loading,setloading] = useState(false)



useEffect(()=>{
  fetchData()
},[])

async function fetchData(req,res){
  try {
    setloading(true)
    const response = await blogApi.get('/allblogs')
    console.log(response.data.blogs);
    
    setdata(response.data.blogs)//set blogdata to data
   
    
    
  } catch (error) {
    console.log(error);
    
    setdata([])//if error occured data will reset
  } finally {
    setloading(false)
  }
}
  return (
    <>
    { loading ? <Loading/> : <BlogCard data={data}/>}
    </>
  )
}

export default Home
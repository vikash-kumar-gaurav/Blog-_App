import React, { useEffect ,useState} from 'react'
import blogApi from '../utils/blogApi'
import BlogCard from '../components/BlogCard'
import Loading from './Loading'

const UserAllblogs = () => {
    const[data,setdata] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async() => {
        try {
            setloading(true)
            const response = await blogApi.get('/user/get-allblogs')
            console.log('response from all',response.data?.blogs);
            setdata(response.data?.blogs)
            
        } catch (error) {
            setloading(false)
        } finally {
            setloading(false)
        }
    }
  return ( 

    <div>
        {
        loading ? (
            <Loading/>
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
            <p>no data found</p>
        )
        
        }
    </div>
    
  )
}

export default UserAllblogs
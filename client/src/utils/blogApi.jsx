import axios from "axios";


const blogApi = axios.create({
    baseURL: "http://localhost:8080/api/v1/blog" ,
    withCredentials: true, // This allows cookies to be sent with requests
})
export default blogApi;
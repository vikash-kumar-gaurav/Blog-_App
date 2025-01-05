import axios from 'axios'

const userApi = axios.create({
    baseURL:"http://localhost:8080/api/v1/user",
    withCredentials: true, // This allows cookies to be sent with requests
})

export default userApi
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './src/config/connectDB.js';
const app = express();
import cors from 'cors'
import userRouter from './src/routes/userRoutes.js'
import blogRouter from './src/routes/blogRoutes.js'
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000
connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`app is listening on the port no ${PORT}`);
        
    })
})

app.get('/',(req,res)=>{
    res.send('<h1>hello ji</h1>')
})

app.use('/api/v1/user',userRouter)
app.use('/api/v1/blog', blogRouter)

import mongoose from "mongoose";

  async function connectDB() {
    if(!process.env.MONGODB_URI){
        throw new Error('MONGODB_URI is empty')
    }

    try {
       const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
       console.log(`mongoDB connected successfully host ${connectionInstance.connection.host} and name ${connectionInstance.connection.name}`)
    } catch (error) {
        console.log(error);
        
    }
 }

 export default connectDB;
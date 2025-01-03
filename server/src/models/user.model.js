import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required : [true, 'Username is required'],
        unique: true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required: [true, 'Email is required'],
        lowercase:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required : [true, 'Password is required'],
        minlength:[6, 'Password must be at least 6 character long'],

    },
    profilePicture :{
        type: String,
        default : ''
    },
    bio : {
        type : String,
        maxlength:[200, 'Bio can not excreed 200 characters'],
        default:''
    },
    role:{
        type : String,
        enum:["admin,user"],
        default:'user'
    }
},{
    timestamps:true
})

const User = mongoose.model('User',userSchema)
export default User;
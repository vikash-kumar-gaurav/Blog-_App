import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required : [true, 'Title is required'],
        trim : true

    },
    content : {
        type : String,
        required : [true, 'Content is required']
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    image : {
        type : String,
        default :''
    },
    tags : {
        type : [String],
        default: []
    },
    likes : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        default : [],
        }
    ],
    comments :[
    {
        user: {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
        comment : {type : String, required : true},
        createdAt: {
            type : Date,
            default : Date.now
        }
    }

    ],
},{
    timestamps: true
})

const Blog = mongoose.model('Blog',blogSchema);

export default Blog
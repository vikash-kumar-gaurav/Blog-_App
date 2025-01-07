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
        default :'https://imgs.search.brave.com/pQgtjoKpKC_KiS_xOcYgpAiCX2qL-283UjaC6l-x3zo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzA4LzQ3Lzc1/LzM2MF9GXzcwODQ3/NzUwOF9ETmt6Uklz/TkZnaWJnQ0o2S29U/Z0pqalJaTkpENG1i/NC5qcGc'
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
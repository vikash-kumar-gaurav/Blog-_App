import Blog from '../models/blog.model.js'
//create a new blog post 
export async function createBlogController(req,res) {
    const { title, content, tags } = req.body
     const blogPicture = req.file
     console.log(title, content,tags,blogPicture);
     

    try {
        //validate the require data
        if(!title || !content){
            return res.status(401).json({
                msg : "Title and Content is required",
                success : false
            })
        };

        //create a  new blog
        const blog = await Blog.create({
            title,
            content,
            tags,
            image:blogPicture.cloudinaryUrl,
           
            author:req.id //add usernameId to it in middleware

        });

        return res.status(200).json({
            msg : "Blog created",
            success : true,
            blog
        })

    } catch (error) {
        console.log(`error from createBlogController ${error}`);
        return res.status(500).json({
            msg : " Server error please try later",
            success : false
        })
        
    }
    
}

//fetch all blogs
export async function getAllBlogsController(req,res) {
    try {
        const blogs = await Blog.find()
        .populate("author","username email")
        .sort({createdAt: -1}); //this will sort by newest first

        return res.status(200).json({
            success : true,
            blogs
        })
    } catch (error) {
        console.log(`Error from getAllBlogsController ${error}`);
        return res.status(500).json({
            msg : " Server Error please try later"
        })
        
    }
    
}

//fetch a single blog by ID
export async function getBlogByIdController(req,res) {
    try {
        const { id } = req.params
        console.log(id);
        

        const blog = await Blog.findById(id).populate("author", "username email")
        if(!blog){
            return res.status(404).json({
                msg : "No Blog found",
                success : false
            })
        };

        //now return the blog you found 
        return res.status(200).json({
            blog,
            success : true
        })
    } catch (error) {
       console.log(`Error from getBlogByIdController ${error}`);
       return res.status(500).json({
        msg : "Server Error please try lataer",
        success : false
       })
        
    }
    
}

//update a existing blog
export async function updateBlogController(req,res) {
    try {
        const { id } = req.params;
        const { title, content, image, tags} = req.body

        const blog = await Blog.findById(id)
        if(!blog){
            return res.status(404).json({
                msg : "Blog not found",
                success : false
            })
        };

       // check if the logged in user is the author
       if(blog.author.toString() !== req.user.id){
            return res.status(403).json({
                msg : "You are not authorized to update this blog",
                success : false
            })
       };

       //now all good update the blog
       blog.title = title || blog.title;
       blog.content = content || blog.content;
       blog.image = image || blog.image;
       blog.tags = tags || blog.tags

       await blog.save();
       //now return the response
       return res.status(200).json({
        msg : "Blog Updated success fully",
        success : true
       })
    } catch (error) {
        console.log(`Error from updateBlogController ${error}`);
        return res.status(500).json({
            msg : "Server error please try again after some time",
            success : false
        })
        
    }
    
}

//Delete a blog
export async function deleteBlogController(req,res) {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json({
                msg : "Blog not found",
                success : false
            })
        };

        //check if the logged in user is author 
        if(blog.author.toString() !== req.user.id){
            return res.status(403).json({
                msg : "You are not authorized to delete this blog"
            })
        };

        //if all good delete blog
        await blog.deleteOne()

        return res.status(200).json({
            msg : "Blog deleted successfully",
            success : true
        })
    } catch (error) {
        console.log(`Error from deleteBlogController ${error}`);
        return res.status(500).json({
            msg : "Server Error please try later",
            success : false
        })
        
    }
    
}
//like or unlike a blog post
// export async function togglelikeController(req,res) {
//     try {
//         const { _id } = req.body
//         const id = _id
//         const userId = req.id;
//         console.log('id from togglelikeController',id);
//         console.log('userid from togglelikeController', userId);
        

//         const blog = await Blog.findById(id);
//         if(!blog){
//             return res.status(404).json({
//                 msg : "No blog found",
//                 success : true
//             })
//         };

        
        
        
//         const isLiked = blog.likes.includes(userId)

//         if(isLiked){
//             blog.likes = blog.likes.filter((like)=>like.toString() !== userId);
//         }else {
//             blog.likes.push(userId)
//         };

//         await blog.save()
//         return res.status(200).json({
//             msg : isLiked ? "Blog unliked" : "Blog liked",
//             success:true,
//             likes : blog.likes
//         })
//     } catch (error) {
//         console.log(`error from togglelikeController ${error}`);
//         return res.status(500).json({
//             msg : "Server Error please try later",
//             success : false
//         })
        
//     }
    
// }

export async function togglelikeController(req, res) {
    try {
      const { _id } = req.body;
      const id = _id;
      const userId = req.id;
      console.log('id from togglelikeController', id);
      console.log('userId from togglelikeController', userId);
  
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({
          msg: "No blog found",
          success: false
        });
      }
  
      // Ensure blog.likes is an array and filter out any invalid values
      blog.likes = blog.likes.filter((like) => like && like.toString);
  
      // Check if userId exists in the blog's likes array
      const isLiked = blog.likes.some((like) => like.toString() === userId);
  
      if (isLiked) {
        // Remove userId from the likes array
        blog.likes = blog.likes.filter((like) => like.toString() !== userId);
      } else {
        // Add userId to the likes array
        blog.likes.push(userId);
      }
  
      // Save the updated blog document
      await blog.save();
  
      return res.status(200).json({
        msg: isLiked ? "Blog unliked" : "Blog liked",
        success: true,
        likes: blog.likes.length // Return the updated like count
      });
    } catch (error) {
      console.log(`error from togglelikeController: ${error}`);
      return res.status(500).json({
        msg: "Server error, please try again later",
        success: false
      });
    }
  }
  
  


//add a comment to a blog
export async function addCommentController(req,res) {
    try {
        const { id } = req.params
        const { comment } = req.body
        if(!comment){
            return res.status(400).json({
                msg : "Comment can not be empty",
                success : false
            })
        };

        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json({
                msg : "Blog not Found",
                success : false
            })
        };
        blog.comments.push({
            user:req.user.id,
            comment
        });

        await blog.save();

        return res.status(200).json({
            msg : "Comment added successfully",
            success : false
        })
        
    } catch (error) {
        console.log(`error from addCommentController ${error}`);
        return res.status(500).json({
            msg : "Server Error please try later",
            success : false
        })
    }
    
}


//find all blogs of author or user that is logged in
export async function getAllUserBlogsController(req,res){
    try {
         const id = req.id
        console.log(id);
        
        if(!id){
            return res.status(402).json({
                msg : "no User find",
                success : false
            })
        };

        const blogs = await Blog.find({author:id})

        return res.status(200).json({
            success : true,
            msg : "Your all blogs",
            blogs
        })
    } catch (error) {
        console.log(`error from getAllUserBlogsController ${error}`);
        return res.status(200).json({
            success : false,
            msg : "Server Error try later"
        })
    }
}
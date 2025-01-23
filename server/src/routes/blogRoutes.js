import Router from 'express'
import { addCommentController, createBlogController, deleteBlogController, getAllBlogsController, getBlogByIdController, togglelikeController, updateBlogController,getAllUserBlogsController } from '../controller/blog.controller.js'
import accessTokenvalidator from '../middleware/auth.middleware.js'
import upload from '../middleware/multer.middleware.js'
import { uploadOnCloudinary } from '../middleware/uploadonCloudinary.js'

const router = Router()
router.post('/create',accessTokenvalidator,upload.single("profilePicture"),uploadOnCloudinary,createBlogController)
router.get('/allblogs',getAllBlogsController)
router.get('/blog/:id',getBlogByIdController)
router.patch('/update-blog',updateBlogController) //use put to update and replace all while patch is used to update and remain same that does'n changes
router.delete('/delete',deleteBlogController)
router.post('/likes',accessTokenvalidator,togglelikeController);
router.post('/add-comment',addCommentController);
router.get('/user/get-allblogs',accessTokenvalidator,getAllUserBlogsController)



export default router
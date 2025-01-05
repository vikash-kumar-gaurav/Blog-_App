import Router from 'express'
import { addCommentController, createBlogController, deleteBlogController, getAllBlogsController, getBlogByIdController, togglelikeController, updateBlogController } from '../controller/blog.controller.js'
import accessTokenvalidator from '../middleware/auth.middleware.js'

const router = Router()
router.post('/create',accessTokenvalidator,createBlogController)
router.get('/allblogs',getAllBlogsController)
router.get('/blog',getBlogByIdController)
router.patch('/update-blog',updateBlogController) //use put to update and replace all while patch is used to update and remain same that does'n changes
router.delete('/delete',deleteBlogController)
router.post('/likes',togglelikeController);
router.post('/add-comment',addCommentController);


export default router
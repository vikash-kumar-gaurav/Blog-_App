import Router from 'express'
import { addCommentController, createBlogController, deleteBlogController, getAllBlogsController, getBlogByIdController, togglelikeController, updateBlogController } from '../controller/blog.controller'

const router = Router()
router.post('/create',createBlogController)
router.get('/allblogs',getAllBlogsController)
router.get('/blog',getBlogByIdController)
router.post('/update-blog',updateBlogController)
router.delete('/delete',deleteBlogController)
router.post('/likes',togglelikeController);
router.post('/add-comment'/addCommentController);


export default router
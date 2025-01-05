import Router from 'express'
import { loginController, registerController } from '../controller/user.controller.js'

const router = Router()
router.post('/register',registerController)
router.post('/login',loginController)

export default router;
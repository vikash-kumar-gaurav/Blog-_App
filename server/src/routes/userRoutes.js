import Router from 'express'
import { loginController, registerController,updateuserdetailsController,getUserDetailsController, forgotPasswordController, otpVerificationController, changePasswordController } from '../controller/user.controller.js'
import accessTokenvalidator from '../middleware/auth.middleware.js'
import upload from '../middleware/multer.middleware.js'
import { uploadOnCloudinary } from '../middleware/uploadonCloudinary.js'
import InitalTokenCheck from '../middleware/toCheckIstokenAvailable.js'

const router = Router()
router.post('/register',upload.single("profilePicture"),uploadOnCloudinary,registerController)
router.post('/login',loginController)
router.post('/forgot-password',forgotPasswordController)
router.post('/submit-otp',otpVerificationController)
router.post('/change-password',changePasswordController)
router.get('/getUser-details',accessTokenvalidator,getUserDetailsController)
router.put('/update-userdetails',accessTokenvalidator,upload.single("profilePicture"),uploadOnCloudinary,updateuserdetailsController)
//use accessToken to get id of user and send to updateuserdetailsController
router.get('/auth-check',InitalTokenCheck)

export default router; 
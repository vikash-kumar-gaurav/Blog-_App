import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import generateAccessToken from "../utils/generateAccessToken.js"
import sendMail from '../utils/sendMail.js'
import { generateOtp } from "../utils/generateOtp.js"
import jwt from 'jsonwebtoken'

//for new user to register
export async function registerController(req,res){
    try {
        const {email,username,password,profilePicture,role,bio} = req.body

        if(!email ||!username ||!password){
            return res.status(402).json({
                success : false,
                msg : "Please provide all details i.e Email, Password and username"
            })
        };
        //check if email is already registered before
        const checkEmail = await User.findOne({email})
        if(checkEmail){
            return res.status(409).json({
                success : false,
                msg : "User already register use diffrent email or LogIn"
            })
        };

        const hasshedPassword = await bcrypt.hash(password,10)

        await User.create({email,password:hasshedPassword,username})
        
        const userData = await User.findOne({email})
        const accessToken =await generateAccessToken({
            _id:userData._id,
            username:userData.username,
            role:userData.role,
            email:userData.email
        })
        const tokenData = jwt.verify(accessToken,process.env.SECRET_TOKEN_KEY)

        const cookieOptions ={
            secure:false,//use true in production
            httpOnly:true /// the accessToken will not stored in the localStorage so u can't access with js
        }

        res.cookie('accessToken',accessToken,cookieOptions)

        //sending a email that you account is created
         sendMail({email,subject:"registration",username})

        //send response to the user 
        return res.status(200).json({
            success : true,
            msg : `account created successfully ${userData.username}`,
            userData,
            tokenData
        })
    } catch (error) {
       console.log(`error from registerConroller ${error}`);
       return res.status(500).json({
        msg :"Server error Please try later"
       })
        
    }
}

//for existing user to Login
export async function loginController(req,res) {
    try {
        const { email, password } = req.body

        //check all data is present 
        if(!email || !password){
            return res.status(401).json({
                msg:"Please fill all detail i.e Email and Password",
                success : false
            })
        };

        //check if user is present or not 
        const validEmail = await User.findOne({email})
        if(!validEmail){
            return res.status(404).json({
                msg : "No user is found please Register first",
                success : false
            })
        };

        //check password
        const validPassword = await bcrypt.compare(password,validEmail.password)
        if(!validPassword){
            return res.status(401).json({
                msg : "Wrong password try again",
                success : false
            })
        };

        //now all the things are right then generate accessToken
        const accessToken = await generateAccessToken({
            email:email,
            username:validEmail.username,
            _id:validEmail._id,
            role:validEmail.role
        })

        const cookieOptions ={
            secure:false,//use true in production
            httpOnly:true /// the accessToken will not stored in the localStorage so u can't access with js
        }

        res.cookie('accessToken',accessToken,cookieOptions)

        //now give the response to the user
        return res.status(200).json({
            msg : `Login successfull ${validEmail.username}`,
            success : true
        })

    } catch (error) {
        console.log(`error from loginController ${error}`);
        return res.status(500).json({
            msg: "Server error try later",
            success : false
        })
        
    }
    
}

//for reset pssword only to generate otp
export async function resetPasswordController(req,res) {
    try {
        const { email} = req.body
        if(!email) {
            return res.status(402).json({
                msg : "No Account found",
                success : false
            })
        };

        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                msg : "User not found Invalid Email",
                success : false
            })
        };

        const otp = await generateOtp()

         await user.otp.save();
         await sendMail({email,otp,username:user.username,subject:"otp verification"})

         return res.status(200).json({
            msg : `otp sent to ${user.username}`,
            success : true
         })
    } catch (error) {
        console.log(`error from resetPasswordController`);
        res.status(500).json({
            msg :"Server Error please try after some time",
            success : false
        })
        
    }
    
}
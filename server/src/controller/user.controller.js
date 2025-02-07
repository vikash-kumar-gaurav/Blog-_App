import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import generateAccessToken from "../utils/generateAccessToken.js"
import sendMail from '../utils/sendMail.js'
import { generateOtp } from "../utils/generateOtp.js"
import jwt from 'jsonwebtoken'

//for new user to register
export async function registerController(req,res){
    try {
        const {email,username,password,name,confirmPassword,mobileNo} = req.body
        const profilePicture = req.file
        
        

        if(password !== confirmPassword){
            return res.json({
                msg : "Confirm Password and Password must be same",
                success : false
            })
        }

        if(!email ||!username ||!password ||!name){
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

        await User.create({email,
            password:hasshedPassword,
            username,
            Name:name,
            profilePicture:profilePicture.cloudinaryUrl,
            mobile_no:mobileNo
        })
        
        const userData = await User.findOne({email})
        const accessToken =await generateAccessToken({
            _id:userData._id,
            username:userData.username,
            role:userData.role,
            email:userData.email,
            name:userData.Name
        })
        const tokenData = jwt.verify(accessToken,process.env.SECRET_TOKEN_KEY)

        const cookieOptions ={
            secure:true,//use true in production
            httpOnly:true, /// the accessToken will not stored in the localStorage so u can't access with js
            sameSite:'none',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
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
            role:validEmail.role,
            profilePicture:validEmail.profilePicture,
            Name:validEmail.Name
        })

        const cookieOptions ={
            secure:true,//use true in production
            httpOnly:true, /// the accessToken will not stored in the localStorage so u can't access with js
            sameSite:'none',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        }

        res.cookie('accessToken',accessToken,cookieOptions)

        //now give the response to the user
        return res.status(200).json({
            msg : `Login successfull ${validEmail.username}`,
            success : true,
            validEmail
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
export async function forgotPasswordController(req,res) {
    try {
        const { email } = req.body
        console.log(email);
        
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

          user.otp = otp
          await user.save()
          sendMail({email,otp,username:user.username,subject:"otp verification"})// dont use await because it slow down you server as it wait for the response that mail has been send

         return res.status(200).json({
            msg : `otp sent to ${user.username}`,
            success : true
         })
    } catch (error) {
        console.log(`error from forgotPasswordController ${error}`);
        res.status(500).json({
            msg :"Server Error please try after some time",
            success : false
        })
        
    }
    
}

//verify otp 
export async function otpVerificationController(req,res){
    try {
        const { email,otp } = req.body

        if(!email || !otp){
            return res.status(401).json({
                msg : "All fields are required i.e Eamil and OTP",
                success : false
            })
        };

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                msg : "no user found",
                success : false
            })  
        };

        if(otp !== user.otp){
            return res.status(401).json({
                msg : "Invalid Otp try again",
                success : false
            })
        }

        return res.status(200).json({
            msg : "otp matched",
            success : true
        })
    } catch (error) {
        console.log(`error from otpverificationController ${error}`);
        return res.status(500).json({
            msg : "Server Error please try after some time",
            success : false
        })
        
    }
}


//change password
export async function changePasswordController(req,res) {
    try {
        const { email, password, confirm_password } = req.body 
        console.log(email,password,confirm_password);
        
        if(!email || !password || !confirm_password){
            return res.status(401).json({
                msg : " all fields are required i.e email, password and confirm password",
                success : false
            })
        };

        if(password !== confirm_password){
            return res.status(401).json({
                msg : " password and Confirm Password must be same",
                success : false
            })
        };

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                msg : "No user found",
                success : false
            })
        }

        const hasshedPassword =await bcrypt.hash(password,10)
        user.password = hasshedPassword
        await user.save()
        return res.status(200).json({
            msg : "password changed please logIn",
            success : true
        })
    } catch (error) {
        console.log(`error from changePasswordController ${error}`);
        return res.status(500).json({
            msg : "Server error Please try after sometime",
            success : false
        })
        
    }
}

//to send user details
export async function getUserDetailsController(req,res) {
    try {
        const id = req.id //get user id from auth middleware
        const user = await User.findById(id).select("-role -_id -otp -updatedAt -isEmailVarified -password -createdAt -email -_v")//use after .slect will dont return the given data
        if(!user){
            return res.status(401).json({
                msg : "No user found LogIn first",
                success : false
            })
        }

        
        return res.status(200).json({
            msg : "data recived",
            success : true,
            user
        }) 
    } catch (error) {
        console.log(`error from getUserDetailsController ${error}`);
        return res.status(500).json({
            msg : "Server Error",
            success : false
        })
        
    }
    
}

//update details
export async function updateuserdetailsController(req,res) {
    try {
        const  Id  = req.id
        const { username, name, bio } = req.body
        const profilePicture = req.file
        
        const updates = {};
        //making a updates object so that we get only updated data
        console.log('from updateuserdetails',username, name, profilePicture, bio);
        

        if(username) updates.username = username
        if(name) updates.name = name
        if(bio) updates.bio = bio
        if(profilePicture) updates.profilePicture = profilePicture.cloudinaryUrl
        
        const user = await User.findByIdAndUpdate(Id,{$set:updates},{new:true})
        //findbyidandupdate find the user using id and only updates only updates field and by default it return the user before updating but new:true send the updated user

        return res.status(200).json({
            msg : "User Details was updated successfully",
            success : true,
            userData:{
                _id:user._id,
                Name:user.Name,
                role:user.role,
                profilePicture:user.profilePicture
            }
        })
        

        
    } catch (error) {
        console.log(`error from updateuserdetailsController ${error}`);
        return res.status(500).json({
            msg : "Server Error please try again",
            success : false
        })
        
    }
    
}

//logout controller
export async function LogoutController(req,res){
    const UserId = req.id
    
    try {
        
        
        

        if(!UserId){
            console.log(`user id from LogoutController ${UserId}`);
            return res.status(401).json({
                
                msg : "Token expire already",
                success : true
            })
        }

        res.clearCookie("accessToken")
        res.status(200).json({
            msg : "Logout successfully",
            success : true
        })
    } catch (error) {
        console.log(`error from LogoutController ${error}` );
        return res.status(500).json({
            msg : "Server Error please try later",
            success : false
        })
        
    }
}






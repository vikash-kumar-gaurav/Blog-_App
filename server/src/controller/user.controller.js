import User from "../models/user.model"
import bcrypt from 'bcrypt'
import generateAccessToken from "../utils/generateAccessToken"

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
        const accessToken = generateAccessToken({
            _id:userData._id,
            username:userData.username,
            role:userData.role,
            email:userData.email
        })

        const cookieOptions ={
            secure:true,
            httpOnly:true
        }

        res.cookie('accessToken',accessToken,cookieOptions)

        //send response to the user 
        return res.status(200).json({
            success : true,
            msg : `account created successfully ${userData.username}`,
            userData
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

        const cookieOptions={
            httpOnly:true,
            secure:true
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
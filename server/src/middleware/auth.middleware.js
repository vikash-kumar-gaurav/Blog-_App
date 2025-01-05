import jwt from 'jsonwebtoken'

async function accessTokenvalidator(req,res,next){
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        
        
        if(!token){
            return res.status(403).json({
                msg : "no token",
                success : false
            })
        };

        //verify token 
        const tokenData = jwt.verify(token,process.env.SECRET_TOKEN_KEY);
        req.id=tokenData._id
        
        next()

    } catch (error) {
        console.log(`error from accessTokenvalidator ${error}`);
        
    }
}
export default accessTokenvalidator
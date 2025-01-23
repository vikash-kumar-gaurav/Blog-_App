import jwt from 'jsonwebtoken'

async function accessTokenvalidator(req,res,next){
    try {
        
    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : req.cookies.accessToken 
    //this will check if accessToken is send by header if by header stored in token or then it will check for cookies
    //if you use httpOnly in cookieOption then the js can not optain accessToken from the localStorage 
    //it is stored in secret position to avoid leakeage so whenever use httpOnly try to access token from req.cookies
       
        
        
        if(!token){
            return res.status(403).json({
                msg : "Session Expired login Again", ///if token is expired or not found
                success : false
            })
        };
        
        

        //verify token 
        const tokenData = jwt.verify(token,process.env.SECRET_TOKEN_KEY);
        req.id=tokenData._id
        
        
        
        next()

    } catch (error) {
        console.log(`error from accessTokenvalidator ${error}`);
        return res.status(500).json({
            msg : "Server error",
            succes : false
        })
        
    }
}
export default accessTokenvalidator
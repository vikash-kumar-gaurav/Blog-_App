import jwt from 'jsonwebtoken'
async function generateAccessToken({email,_id,role,username}) {
    try {
        const token = jwt.sign({
            _id,
            username,
            role,
            email
        },process.env.SECRET_TOKEN_KEY,
        {expiresIn:'1h'})
        return token
    } catch (error) {
       console.log(`error from generateAccessToken ${error}`);
        
    }
};

export default generateAccessToken;


       
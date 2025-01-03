async function generateAccessToken({email,_id,role,username}) {

            const Token = jwt.sign({
                _id:_id,
                username:username,
                role:role,
                email:email
            },process.env.SECRET_TOKEN_KEY  
        )

        return Token
    
};

export default generateAccessToken;
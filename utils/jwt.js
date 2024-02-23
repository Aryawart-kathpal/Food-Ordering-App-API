require('dotenv').config();
const jwt = require('jsonwebtoken');

const createJWT =({payload})=>{
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME});
    return token;
}

// user is the tokenUser actually
const attachCookiesToResponse = ({res,user,refreshToken})=>{
    const accessTokenJWT = createJWT({payload:{user}});
    const refreshTokenJWT=createJWT({payload:{user,refreshToken}});
    
    const oneDay = 1000*60*60*24;
    const longerExp=1000*60*60*24*30;

    res.cookie('accessToken',
    accessTokenJWT,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',signed:true,
        expiresIn:new Date(Date.now()+oneDay),
    })
    
    res.cookie('refreshToken',
    refreshTokenJWT,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        signed:true,
        expiresIn:new Date(Date.now()+longerExp),
    });
}

const isTokenValid = ({token})=> jwt.verify(token,process.env.JWT_SECRET);

module.exports ={createJWT,isTokenValid,attachCookiesToResponse};
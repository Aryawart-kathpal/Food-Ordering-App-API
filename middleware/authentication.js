const CustomError = require('../errors');
const {isTokenValid,attachCookiesToResponse}= require('../utils');
const Token=require('../models/Token');

const authenticateUser = async(req,res,next)=>{
    const {refreshToken,accessToken}=req.signedCookies;
    try{
        if(accessToken){
            const payload = isTokenValid({token:accessToken});
            req.user=payload.user;
            return next();
        }
        const payload=isTokenValid({token:refreshToken});

        const existingToken= await Token.findOne({
            user:payload.user.userId,
            refreshToken:payload.refreshToken,
        });

        if(!existingToken || !existingToken?.isValid){
            throw new CustomError.UnauthenticatedError('Authentication Invalid');
        }

        attachCookiesToResponse({
            res,
            user:payload.user,
            refreshToken:payload.refreshToken
        })
        req.user=payload.user;
        next();
    }
    catch(error){
        console.log(error);
        throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }
}

const authorizePermissions = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizedError("Authorization invalid");
        }
        next();
    }
}

module.exports={authenticateUser,authorizePermissions};
// const {CustomAPIError} = require('../errors'); -> no need of importing this now
const {StatusCodes}= require('http-status-codes'); // required

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError ={
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err.message || "Something went wrong try again later"
    }

    // console.log("Error handler middleware triggered:", err);

//    we don't need this if statment now coz that's already being handled in the customError now  
    // if (err instanceof CustomAPIError /*|| err.constructor === CustomAPIError*/) {
    //     return res.status(err.statusCode).json({ msg: err.message });
    // }

    // in the validation error object there is the object has a name property with name="ValidationError" and that object further has objects of the specific errors(email,password) within them there is a message propery, to access them again we use Objects.values(), this time as here we have to access the value() in the message field

    if(err.name==="ValidationError"){
        customError.msg = Object.values(err.errors).map((item)=> item.message).join(',');
        customError.statusCode= StatusCodes.BAD_REQUEST;//400
    }

    // in the case of a duplicate request when we see the pregenerated error that we get, we see the error code be be 11000 in it, and in the keyValue field the email is there
    if(err.code && err.code === 11000){// in js we have Object.keys() to access inside the err object
        customError.msg =`Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode= StatusCodes.BAD_REQUEST;//400
    }
    // Cast error is the error in which the syntax of the passed params id doesn't match the syntax of the mongoose id
    // when we see the cast error object it has the property with name="CastError" and the value property contains the params id we passed
    // for more info of this type we can anytime log the err object to get detail of other more objects
    if(err.name==="CastError"){
        customError.msg =`No item found with id : ${err.value}`;
        customError.statusCode=StatusCodes.BAD_REQUEST;//400
    }

    // 500 -> Internal Server Error
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err});
    return res.status(customError.statusCode).json({msg:customError.msg});
};

module.exports = errorHandlerMiddleware;
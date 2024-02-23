const CustomAPIError = require('./custom-error');
const{StatusCodes}= require('http-status-codes');

class UnauthenticatedError extends CustomAPIError{
    constructor(message,statusCode){
        super(message);
        this.statusCode=StatusCodes.UNAUTHORIZED;//401
    }
}

module.exports=UnauthenticatedError;
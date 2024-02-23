const CustomAPIError = require('./custom-error');
const{StatusCodes}= require('http-status-codes');

class notFoundError extends CustomAPIError{
    constructor(message,statusCode){
        super(message);
        this.statusCode=StatusCodes.NOT_FOUND;//400
    }
}

module.exports=notFoundError;
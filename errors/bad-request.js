const CustomAPIError = require('./custom-error');
const{StatusCodes} = require('http-status-codes');

class BadRequestError extends CustomAPIError{
    constructor(message,statusCode){
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;//400
    }
}

module.exports=BadRequestError;
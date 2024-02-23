const CustomAPIError = require('./custom-error');
const UnauthenticatedError = require('./unauthenticated');
const notFoundError = require('./not-found');
const BadRequestError = require('./bad-request');
const UnauthorizedError = require('./unauthorized');

module.exports ={CustomAPIError,UnauthenticatedError,notFoundError,BadRequestError,UnauthorizedError};
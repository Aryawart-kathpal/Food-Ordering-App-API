class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // this.name = this.constructor.name;
    }
}
module.exports = CustomAPIError;
class CustomError extends Error {
    constructor(message){
        super(message);
        this.code = code;
    }
}

module.exports = CustomError;
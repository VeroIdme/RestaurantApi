
class AppError extends Error{
    constructor(messagge, statusCode){
        super(messagge)
        this.messagge = messagge
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith("4")? 'error' : 'fail'
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError
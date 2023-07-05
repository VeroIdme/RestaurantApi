require("dotenv").config()
const AppError = require("../utils/appError")

const handlerError23505 = () => new AppError("Value duplicate, please insert correct value", 401)

const sendErrorDevelopment = (err, res) => {
    console.log(err)
    res.status(err.statusCode).json({
        status: err.status,
        messagge: err.messagge,
        stack: err.stack
    })
}
const sendErrorProduction = (err, res) => {
 if(err.isOperational){
    res.status(err.statusCode).json({
        status: err.status,
        messagge: err.messagge
    })
 } else {
    res.status(500).json({
        status: 'fail',
        messagge: 'Internal Server Error'
    })
 }
}
const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'fail'

    if(process.env.NODE_ENV === 'development') sendErrorDevelopment(err, res)
    if(process.env.NODE_ENV === 'production'){
        let error = err
        if(error.parent?.code === '23505') {
            error = handlerError23505()
        }
        sendErrorProduction(error, res)
    }
    next()
}

module.exports = globalError
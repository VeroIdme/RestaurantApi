require("dotenv").config()
const catchAsync = require("../utils/catchAsync")
const { promisify } = require("util")
const jwt = require("jsonwebtoken")
const AppError = require("../utils/appError")
const User = require("../models/user.model")

exports.protected = catchAsync( async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    console.log(token)
    if(!token) next(new AppError("User this token is disabled", 404))

    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT_SEED)

    const user = await User.findOne({
        where:{
            id: decoded.id,
            status: "active"
        }
    })

    if(!user) next(new AppError("User not found", 404))

    req.sessionUser = user

    next()
})
exports.protectedOwnerAccount = catchAsync( async(req, res, next) => {
    const { user, sessionUser  } = req

    if(sessionUser.id !== user.id) next(new AppError("You are not authorizared for this action", 401))

    next()
})
exports.roles = (...roles) => {
    return (req, res, next) => {
    const { sessionUser } = req

    if(!roles.includes(sessionUser.role)) next(new AppError("You are not authorizared for this action", 403))
    next()
}}
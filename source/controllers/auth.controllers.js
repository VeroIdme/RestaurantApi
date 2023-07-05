const User =  require("../models/user.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const generateJWT = require("../utils/jsw")
const bcrypt = require("bcrypt")


exports.signup = catchAsync( async (req, res, next) => {
    const { name, email, password } = req.body

    const salt = await bcrypt.genSalt(12)
    const encryptedPassword = await bcrypt.hash(password, salt)
    
    const user = await User.create({
        name: name.toLowerCase(), 
        email: email.toLowerCase(),
        password: encryptedPassword
    })

    const token = await generateJWT(user.id)

    res.status(210).json({
        status: "Success",
        messagge: "User have been created",
        token,
        user: {
            name: user.name,
            email: user.email,
            role: user.role,
        },
    })    
}) 
exports.login = catchAsync( async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({
        where: {
            email: email.toLowerCase(),
            status: "active"
        }
    })

    if(!user) next(new AppError("Email or password incorrect", 401))
    
    if(!(await bcrypt.compare(password, user.password))) next(new AppError("Email or password incorrect", 401))

    const token = await generateJWT(user.id)

    res.status(210).json({
        status: "Success",
        messagge: "User logged",
        token,
        user: {
            name: user.name,
            email: user.email,
            role: user.role,
        },
    })
}) 
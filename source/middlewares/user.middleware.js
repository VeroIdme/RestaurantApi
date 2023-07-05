const AppError = require("../utils/appError")
const User =  require("../models/user.model")
const Meal =  require("../models/meal.model")
const Restaurant =  require("../models/restaurant.model")
const catchAsync = require("../utils/catchAsync")

exports.validUser = catchAsync( async(req, res, next) => {
    const { id } = req.params

    const user = await User.findOne({
        where: {
            id,
            status: "active"
        },
    })

    if(!user) next(new AppError("User not found", 404 ))
    
    req.user = user
    
    next()
})
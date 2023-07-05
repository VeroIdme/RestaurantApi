const AppError = require("../utils/appError")
const Order =  require("../models/order.model")
const Meal =  require("../models/meal.model")
const Restaurant =  require("../models/restaurant.model")
const catchAsync = require("../utils/catchAsync")
const User = require("../models/user.model")

exports.validOrder = catchAsync( async(req, res, next) => {
    const { id } = req.params

    const order = await Order.findOne({
        where: {
            id,
            status: "active"
        },
        include: [
            {
                model: Meal
            },
            {
                model: User
            }
        ]
    })

    if(!order) next(new AppError("Order not found", 404 ))
    
    req.order = order
    req.user = order.user
    req.meal = order.meal
  
    
    next()
})
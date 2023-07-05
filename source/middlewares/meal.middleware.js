const AppError = require("../utils/appError")
const Meal =  require("../models/meal.model")
const Restaurant =  require("../models/restaurant.model")
const catchAsync = require("../utils/catchAsync")

exports.validMeal = catchAsync( async(req, res, next) => {
    const { id } = req.params
    const { mealId } = req.body

    const meal = await Meal.findOne({
        where: {
            id: id || mealId,
            status: "active"
        },
        include: [
            {
                model: Restaurant
            },
        ]
    })

    if(!meal) next(new AppError("Meal not found", 404 ))
    
    req.meal = meal
    req.restaurant = meal.restaurant
    
    next()
})
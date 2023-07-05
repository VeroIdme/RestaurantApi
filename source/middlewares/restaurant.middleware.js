const AppError = require("../utils/appError")
const Review =  require("../models/review.model")
const Restaurant =  require("../models/restaurant.model")
const catchAsync = require("../utils/catchAsync")

exports.validRestaurant = catchAsync( async(req, res, next) => {
    const { id, restaurantId } = req.params

    const restaurant = await Restaurant.findOne({
        where: {
            id: id || restaurantId,
            status: "active"
        },

    })

    if(!restaurant) next(new AppError("Restaurant not found", 404 ))
    
    req.restaurant = restaurant
    
    next()
})
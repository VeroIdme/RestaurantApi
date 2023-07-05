const AppError = require("../utils/appError")
const User =  require("../models/user.model")
const Review = require("../models/review.model")
const catchAsync = require("../utils/catchAsync")

exports.validReview = catchAsync( async(req, res, next) => {
    const { id } = req.params

    const review = await Review.findOne({
        where: {
            id,
        },
        include: [
            {
                model: User
            }
        ]
    })

    if(!review) next(new AppError("Review not found", 404 ))
    
    req.review = review
    req.user = review.user
    
    next()
})
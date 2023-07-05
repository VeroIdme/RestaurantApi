const Restaurant =  require("../models/restaurant.model")
const Review = require("../models/review.model")
const catchAsync = require("../utils/catchAsync")

//Crear restaurante
exports.createRestaurant = catchAsync( async (req, res, next) => {
    const { name, address, rating } = req.body

    const restaurant = await Restaurant.create({
        name: name.toLowerCase(),
        address: address.toLowerCase(),
        rating
    })

    res.status(210).json({
        status: "Success",
        messagge: "Restaurant created",
        restaurant
    })    
}) 
//Encontrar todos los restaurantes activo
exports.findRestaurants = catchAsync( async (req, res, next) => {
    
    const restaurants = await Restaurant.findAll({
        where: {
            status: "active"
        },
        include: [
            {
                model: Review
            }
        ]
    })

    res.status(210).json({
        status: "Success",
        results: restaurants.length,
        restaurants
    })

}) 
//Encontrar un restaurante por id
exports.findRestaurant = catchAsync( async (req, res, next) => {
    const { restaurant } = req

    res.status(210).json({
        status: "Success",
        messagge: "Restaurant found",
        restaurant
    })
}) 
//Actualizar rest
exports.updateRestaurants = catchAsync( async (req, res, next) => {
    const { restaurant } = req
    const { name, address } = req.body

    const restUpdate = await restaurant.update({
        name: name.toLowerCase(),
        address: address.toLowerCase(),
    })

    res.status(210).json({
        status: "Success",
        restaurant: restUpdate
    })
}) 
//Eliminar rest
exports.deleteRestaurants = catchAsync( async (req, res, next) => {
    const { restaurant } = req

    await restaurant.update({status: "deleted"})

    res.status(210).json({
        status: "Success",
        messagge: "Rest deleted"
    })
}) 

//!Controladores de reviews
//Crear resenia
exports.createReview = catchAsync( async (req, res, next) => {
    const { comment, rating } = req.body
    const { sessionUser, restaurant } = req

    const review = await Review.create({
        userId: sessionUser.id,
        restaurantId: restaurant.id,
        comment: comment.toLowerCase(),
        rating,
    })

    res.status(210).json({
        status: "Success",
        review: {
            comment: review.comment,
            rating: review.rating
        }
    })
}) 
//Actualizar resena
exports.updateReview = catchAsync( async (req, res, next) => {
    const { review } = req
    const { comment, rating } = req.body

    const reviewUp = await review.update({
        comment: comment.toLowerCase(),
        rating,
    })

    res.status(210).json({
        status: "Success",
        review: {
            comment: reviewUp.comment,
            rating: reviewUp.rating
        }
    })
}) 
//Eliminar resena
exports.deleteReview = catchAsync( async (req, res, next) => {
    const { review } = req

    await review.update({status: "deleted"})

    res.status(210).json({
        status: "Success",
        messagge: "Review deleted"
    })
}) 

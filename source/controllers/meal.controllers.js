const Meal =  require("../models/meal.model")
const Restaurant = require("../models/restaurant.model")
const catchAsync = require("../utils/catchAsync")

//Encontrar todos los platillos
exports.findMeals = catchAsync( async (req, res, next) => {
    const meals = await Meal.findAll({
        where: {
            status: "active"
        },
        include: [
            {
                model: Restaurant
            }
        ]
    })
    res.status(210).json({
        status: "Success",
        results: meals.length,
        meals
    })
}) 
//Encontrar el platillo
exports.findMeal = catchAsync( async (req, res, next) => {
    const { meal } = req

    res.status(210).json({
        status: "Success",
        meal
    })
}) 
//Crear platillos
exports.createMeals = catchAsync( async (req, res, next) => {
    const { name, price } = req.body
    const { restaurant } = req

    const meal = await Meal.create({
        name: name.toLowerCase(),
        price,
        restaurantId: restaurant.id
    })

    res.status(210).json({
        status: "Success",
        meal
    })
}) 
//Actualizar plato
exports.updateMeals = catchAsync( async (req, res, next) => {
    const { meal } = req
    const { name, price } = req.body

    const mealUpdate = await meal.update({
        name: name.toLowerCase(),
        price,
    })

    res.status(210).json({
        status: "Success",
        meal: mealUpdate
    })
}) 
//Eliminar plato
exports.deleteMeals = catchAsync( async (req, res, next) => {
    const { meal } = req

    await meal.update({status: "disabled"})

    res.status(210).json({
        status: "Success",
        messagge: "Meal deleted"
    })
}) 
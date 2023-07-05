const User =  require("../models/user.model")
const Order =  require("../models/order.model")
const Meal = require("../models/meal.model")
const catchAsync = require("../utils/catchAsync")

//Encontrar las todas las ordenes
exports.findOrders = catchAsync( async (req, res, next) => {
    const { sessionUser } = req
    const orders = await Order.findAll({
        where: {
            userId: sessionUser.id,
            status: "active"
        },
        include: [
            {
                model: Meal
            }
        ]
    })
    res.status(210).json({
        status: "Success",
        result: orders.length,
        orders,
    })    
}) 
//Encontrar una orden por el id
exports.findOrder = catchAsync( async (req, res, next) => {
    const { order } = req

    res.status(210).json({
        status: "Success",
        order,
    })
}) 
//Actualizar el usuario
exports.updateUser = catchAsync( async (req, res, next) => {
    const { user } = req
    const { name, email } = req.body

    const updateUser = await user.update({
        name: name.toLowerCase(),
        email: email.toLowerCase()
    })

    res.status(210).json({
        status: "Success",
        user: {
            name: updateUser.name,
            email: updateUser.email,
            role: updateUser.role
        }
    })    
}) 
//Eliminar el usuario
exports.deleteUser = catchAsync( async (req, res, next) => {
    const { user } = req

    await user.update({status: "disabled"})

    res.status(210).json({
        status: "Success",
        messagge: "User have been deleted"
    })
}) 
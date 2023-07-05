const Meal = require("../models/meal.model")
const Order =  require("../models/order.model")
const Restaurant =  require("../models/restaurant.model")
const catchAsync = require("../utils/catchAsync")

//Encontrar todas las ordenes
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
//Crear orden
exports.createOrder = catchAsync( async (req, res, next) => {
    const { meal } = req
    const { quantity, mealId } = req.body
    const { sessionUser } = req

    const totalPrice = meal.price * quantity

    const order = await Order.create({
        mealId,
        userId: sessionUser.id,
        totalPrice,
        quantity
    })

    res.status(210).json({
        status: "Success",
        order,
    })
}) 
//Actualizar order
exports.updateOrder = catchAsync( async (req, res, next) => {
    const { order } = req

    await order.update({ status: "completed"})

    res.status(210).json({
        status: "Success,",
        messagge: "Order completed"
    })
}) 
//Eliminar order
exports.deleteOrder = catchAsync( async (req, res, next) => {
    const { order } = req
    
    await order.update({ status: "cancelled"})

    res.status(210).json({
        status: "Success",
        messagge: "Order cancelled"
    })
}) 
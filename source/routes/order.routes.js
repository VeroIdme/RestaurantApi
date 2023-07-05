const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const orderMiddleware = require("../middlewares/order.middleware")
const mealMiddleware = require("../middlewares/meal.middleware")
const orderController = require("../controllers/order.controllers")

const router = express.Router()

router.use(authMiddleware.protected)

router.post("/",
        mealMiddleware.validMeal,
        orderController.createOrder)
router.get("/me",
        orderController.findOrders)
router.route("/:id")
        .patch(
            orderMiddleware.validOrder,
            authMiddleware.protectedOwnerAccount,
            orderController.updateOrder
        )
        .delete(
            orderMiddleware.validOrder,
            authMiddleware.protectedOwnerAccount,
            orderController.deleteOrder
        )

module.exports = router
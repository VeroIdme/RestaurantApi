const express = require("express")
const userControllers = require("../controllers/user.controllers")
const authMiddlewares = require("../middlewares/auth.middleware")
const userMiddlewares = require("../middlewares/user.middleware")
const orderMiddleware = require("../middlewares/order.middleware")

const router = express.Router()

router.use(authMiddlewares.protected)

router.get("/orders", userControllers.findOrders)
router.get("/orders/:id",
            orderMiddleware.validOrder,
            userControllers.findOrder)

router.route("/:id")
    .patch(
        userMiddlewares.validUser,
        authMiddlewares.protectedOwnerAccount,
        userControllers.updateUser)
router.route("/:id")
    .delete(
        userMiddlewares.validUser,
        authMiddlewares.protectedOwnerAccount,
        userControllers.deleteUser)

module.exports = router
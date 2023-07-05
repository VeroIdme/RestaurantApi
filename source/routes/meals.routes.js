const express = require("express")
const authMiddlewares = require("../middlewares/auth.middleware")
const mealMiddleware = require("../middlewares/meal.middleware")
const mealControllers = require("../controllers/meal.controllers")
const restaurantMiddleware = require("../middlewares/restaurant.middleware")
const validationMiddleware = require("../middlewares/validation.middleware")

const router = express.Router()

router.get("/", mealControllers.findMeals)
router.get("/:id", 
    mealMiddleware.validMeal,
    mealControllers.findMeal)
    
router.use(authMiddlewares.protected)

router.use(authMiddlewares.roles("admin"))
router.route("/:id")
    .post(
        validationMiddleware.createMeal,
        restaurantMiddleware.validRestaurant,
        mealControllers.createMeals
    )
    .patch(
        mealMiddleware.validMeal,
        mealControllers.updateMeals
    )
    .delete(
        mealMiddleware.validMeal,
        mealControllers.deleteMeals
    )

module.exports = router
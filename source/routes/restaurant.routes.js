const express = require("express")
const authMiddlewares = require("../middlewares/auth.middleware")
const restMiddlewares = require("../middlewares/restaurant.middleware")
const restControllers = require("../controllers/restaurant.controllers")
const validationMiddleware = require("../middlewares/validation.middleware")
const reviewMiddleware = require("../middlewares/review.middleware")

const router = express.Router()

router.get("/", restControllers.findRestaurants)
router.get("/:id", 
        restMiddlewares.validRestaurant,
        restControllers.findRestaurant)

router.use(authMiddlewares.protected)

router.post("/reviews/:id",
        restMiddlewares.validRestaurant,
        restControllers.createReview
)
router.patch("/reviews/:restaurantId/:id",
        restMiddlewares.validRestaurant,
        reviewMiddleware.validReview,
        authMiddlewares.protectedOwnerAccount,
        restControllers.updateReview
        )
router.delete("/reviews/:restaurantId/:id",
        restMiddlewares.validRestaurant,
        reviewMiddleware.validReview,
        authMiddlewares.protectedOwnerAccount,
        restControllers.deleteReview
        )
        
router.use(authMiddlewares.roles("admin"))
router.route("/")
    .post(
        validationMiddleware.createRestaurant,
        restControllers.createRestaurant
    )
router.route("/:id")
    .patch(
        restMiddlewares.validRestaurant,
        restControllers.updateRestaurants
    )
    .delete(
        restMiddlewares.validRestaurant,
        restControllers.deleteRestaurants
    )

module.exports = router
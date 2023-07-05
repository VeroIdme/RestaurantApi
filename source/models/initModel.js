const User = require("../models/user.model")
const Order = require("../models/order.model")
const Meal = require("../models/meal.model")
const Restaurant = require("../models/restaurant.model")
const Review = require("../models/review.model")

const initModel = () => {
    User.hasMany(Order)
    Order.belongsTo(User)

    User.hasMany(Review, {foreignKey: "userId"})
    Review.belongsTo(User, {foreignKey: "userId"})

    Restaurant.hasMany(Review, {foreignKey: "restaurantId"})
    Review.belongsTo(Restaurant, {foreignKey: "restaurantId"})

    Restaurant.hasMany(Meal)
    Meal.belongsTo(Restaurant)

    Meal.hasOne(Order)
    Order.hasOne(Meal)

}

module.exports = initModel
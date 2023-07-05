const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const globalError = require("./controllers/error.controllers")
const AppError = require("./utils/appError")

const app = express()
app.use(express.json())
//Ejecuatando middlewares
app.use(cors())
app.use(morgan("dev"))

//Importando routes
const authRoutes = require("./routes/auth.routes")
const userRoutes =  require("./routes/user.routes")
const restaurantRoutes = require("./routes/restaurant.routes")
const mealRoutes = require("./routes/meals.routes")
const orderRoutes = require("./routes/order.routes")

//LLamando a las routes
app.use("/api/v1/users", authRoutes, userRoutes)
app.use("/api/v1/restaurants", restaurantRoutes)
app.use("/api/v1/meals", mealRoutes)
app.use("/api/v1/orders", orderRoutes)


//Manejando los errores de manera global

app.all("*", (req, res, next) => {
    return next(new AppError(`Can't find the url ${originalUrl} on this server`), 400)
})

app.use(globalError)
//Exportando el app
module.exports = app
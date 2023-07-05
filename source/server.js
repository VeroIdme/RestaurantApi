const {db} = require("./database/config")
const app = require("./app")
const initModel = require("./models/initModel")
require("dotenv").config()


//Autenticando y sincronizando
db.authenticate()
    .then(() => console.log("Database authenthicated"))
    .catch(err => console.log(err))

initModel()

db.sync()
    .then(() => console.log("Database synced"))
    .catch(err => console.log(err))

//Implementando el metodo listen
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
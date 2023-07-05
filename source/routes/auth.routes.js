const express = require("express")
const authControllers = require("../controllers/auth.controllers")
const validationMiddleware = require("../middlewares/validation.middleware")

const router = express.Router()

router.route("/signup")
    .post(
     validationMiddleware.signup,
     authControllers.signup)
router.route("/login")
    .post(
     validationMiddleware.login,
     authControllers.login)

module.exports = router
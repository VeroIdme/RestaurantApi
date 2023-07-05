const { body, validationResult } = require("express-validator")

const validationFields = (req, res, next) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(404).json({
            status: 'error',
            errors: errors.mapped()
        })
    }
    next()
}

exports.signup = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({max: 25})
        .withMessage("Max of characters is 25"),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("It is not email"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({min: 8})
        .withMessage("Min required is 8")
        .isLength({max: 25})
        .withMessage("Max required is 25"),
    validationFields
]
exports.login = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("It is not email"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({min: 8})
        .withMessage("Min required is 8")
        .isLength({max: 25})
        .withMessage("Max required is 25"),
    validationFields
]
exports.createMeal = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({max: 25})
        .withMessage("Max of characters is 25"),
    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isInt()
        .withMessage("Price is a number integer"),
    validationFields
]
exports.createRestaurant = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({max: 25})
        .withMessage("Max of characters is 25"),
    body("address")
        .notEmpty()
        .withMessage("Address is required")
        .isLength({max: 50})
        .withMessage("Max of characters is 50"),
    body("rating")
        .notEmpty()
        .withMessage("Rating is required")
        .isInt()
        .withMessage("Rating is a number integer"),
    validationFields
]
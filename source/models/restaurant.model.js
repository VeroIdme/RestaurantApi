const { DataTypes } = require("sequelize")
const { db } = require("../database/config")

const Restaurant =  db.define("restaurants", {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("active", "deleted"),
        allowNull: false,
        defaultValue: "active"
    }
})

module.exports = Restaurant
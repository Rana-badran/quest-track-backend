const sequelize = require("../config/db");

const {DataTypes, Model} = require ("sequelize");

const User = sequelize.define(
    'User',
    {
        userId: {
            type:DataTypes.INTEGER,
            allowNull: false,  
            primaryKey: true,
            autoIncrement: true 
        },
        firstName: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                  msg: "Must be a valid email address",
                },
            },
            unique: true,
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                args:[8,20],
                msg: "password must be between 8-20 characters"
            }
        },
    }
)

module.exports = User
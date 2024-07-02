const sequelize = require("../config/db");

const {DataTypes, Model} = require ("sequelize");

const Category = sequelize.define(
    'Category',
    {
        categoryId: {
            type:DataTypes.INTEGER,
            allowNull: false,  
            primaryKey: true,
            autoIncrement: true 
        },
        categoryName: {
            type:DataTypes.STRING,
            allowNull: false,
        }});

module.exports = Category
const sequelize = require("../config/db");

const {DataTypes, Model} = require ("sequelize");
const User = require("./User");
const Category = require("./Category");

const Quest = sequelize.define(
    'Quest',
    {
        questId: {
            type:DataTypes.INTEGER,
            allowNull: false,  
            primaryKey: true,
            autoIncrement: true 
        },
        questName: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        importance: {
            type:DataTypes.INTEGER,
            allowNull: false,  
        },
        dueDate: {
            type:DataTypes.DATE,
            allowNull: false, 
        },
        userId: {
            type:DataTypes.INTEGER,
                allowNull: false,  
                references: {model:User, key:"userId"}
        },
        categoryId: {
            type:DataTypes.INTEGER,
                allowNull: false,  
                references: {model:Category, key:"categoryId"}
        }
    }
)
module.exports = Quest
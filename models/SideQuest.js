const {sequelize} = require("../config/db");

const {DataTypes, Model} = require ("sequelize");
const Quest = require("./Quest");

const SideQuest = sequelize.define(
    'SideQuest',
    {
        sidequestId: {
            type:DataTypes.INTEGER,
            allowNull: false,  
            primaryKey: true,
            autoIncrement: true 
        },
        sideQuestName: {
            type:DataTypes.STRING,
            allowNull: false,
        },
      
        status: {
            type:DataTypes.STRING,
            allowNull: false,
    },
    questId: {
        type:DataTypes.INTEGER,
            allowNull: false,  
            references: {model:Quest, key:"questId"}
    }
    }
)
module.exports = SideQuest
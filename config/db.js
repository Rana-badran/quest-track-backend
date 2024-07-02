const {Sequelize} = require ("sequelize");
const sequelize = new Sequelize ("quest_track","root","", {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
// connecting database 
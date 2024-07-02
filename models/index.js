const User = require ("./User")
const Quest = require ("./Quest")
const Category = require("./category")

User.hasMany(Quest,{
    foreignKey: "userId",
    onDelete: "CASCADE"
})

Quest.belongsTo(User,{
    foreignKey: "userId",
})

Quest.hasMany(Category,{
    foreignKey: "questId",
    onDelete: "CASCADE"
})
// look at many to many in squelize has many, belongs to many (associations)
const User = require ("./User")
const Quest = require ("./Quest")
const Category = require("./Category")
const SideQuest = require("./SideQuest")

User.hasMany(Quest,{
    foreignKey: "userId",
    onDelete: "CASCADE"
})

Quest.belongsTo(User)

Category.hasMany(Quest,{
    foreignKey: "categoryId",
    onDelete: "CASCADE"
})

Quest.belongsTo(Category)

Quest.hasMany(SideQuest,{
    foreignKey:"questId",
    onDelete: "CASCADE"
})

SideQuest.belongsTo(Quest
)

//belongs to and has many are methods (a category has many quests - read from left to right)
// has many will always have a corresponding belongs to thats the opposite
// every sidequest will have a foreign key (whats the thing that has many, the many have to be linked to the parent/main)

module.exports = {
    User, Quest, Category, SideQuest
}
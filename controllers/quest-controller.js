const {Quest} = require('../models/Quest');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const createQuest = async (req, res) => {
  // can't create quests unless you're authorized --> adding in the routes and how to access the userid after authorized 
  console.log("createQuest", req.loggedUser);  
  try {
    // this will only happen from the request, pulling the data from the request based on the model, expecting the request to have those properties 
      const {questName, description, difficulty, status, importance, dueDate, categoryId } = req.body;
      if (req.loggedUser) {
        // creating an object with keys, destructuring shortcut (when the key and the value are the same) -> sequelize line to create the quest
         await Quest.create({questName, description, difficulty, status, importance, dueDate, categoryId, userId:req.loggedUser.userId });
        // const newQuest = await Quest.create({ questName, description, difficulty, status, importance, dueDate });
        res.status(201).json( {message:"success! new quest created"});
      }
      // add else "not authorized"
      // create with userid 
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: ' Server Error' });
    }
  };

  const getAllQuests = async (req, res) => {
    try {
      const quest = await Quest.findAll();
      // where userid is req.loggedUser.userId
      res.status(200).json(quest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
    // add filters request.query
  };

  const updateQuestById = async (req, res) => {
    try {
      const { id } = req.params;
      const { questName, description, difficulty, status, importance, dueDate } = req.body;
      const quest = await Quest.findByPk(id);
      if (quest) {
        quest.questname = questName;
        quest.description = description;
        quest.difficulty = difficulty;
        quest.status = status;
        quest.importance = importance;
        quest.duedate = dueDate;
        await quest.save();
        res.status(200).json(quest);
      } else {
        res.status(404).json({ error: 'quest not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  };

  const deleteQuestById = async (req, res) => {
    try {
      const { id } = req.params;
      const quest = await Quest.findByPk(id);
      if (quest) {
        await quest.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'quest not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = {
    createQuest,
    getAllQuests,
    updateQuestById,
    deleteQuestById 
  }
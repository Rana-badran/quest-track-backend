// how to create a record with sequlize model using the user model, request body

const {Quest} = require('../models/Quest');

const createQuest = async (req, res) => {
    try {
      const {questName, description, difficulty, status, importance, dueDate } = req.body;
      const newQuest = await Quest.create({ questName, description, difficulty, status, importance, dueDate });
      res.status(201).json(newQuest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: ' Server Error' });
    }
  };

  const getAllQuests = async (req, res) => {
    try {
      const quest = await User.findAll();
      res.status(200).json(quest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
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
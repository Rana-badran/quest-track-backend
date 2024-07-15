const {Category} = require('../models/index');

const createCategory = async (req, res) => {
    try {
      const {categoryName} = req.body;
      const newCategory = await Category.create({categoryName});
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: ' Server Error' });
    }
  };

  const getAllCategories = async (req, res) => {
    try {
      const category = await Category.findAll();
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
    // add filters request.query
  };
  
  module.exports = {
    createCategory, getAllCategories}
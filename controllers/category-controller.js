const {Category} = require('../models/Category');

const createCategory = async (req, res) => {
    try {
      const {categorytName} = req.body;
      const newCategory = await Category.create({categorytName});
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: ' Server Error' });
    }
  };

  module.exports = {
    createCategory}
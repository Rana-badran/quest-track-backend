const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/category-controller');

// POST /create a new category 
router.post('/', categoryController.createCategory);

// GET /get all categories 
router.get('/', categoryController.getAllCategories);

module.exports = router;
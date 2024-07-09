const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/category-controller');

// POST /create a new category 
router.post('/', categoryController.createCategory);

module.exports = router;
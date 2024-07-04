const express = require("express");
const router = express.Router();
const userController = require('../controllers/user-controller');
// all start with /users
// POST /create a new user 
router.post('/', userController.createUser);

// POST / user login
router.get('/login', userController.logInUser);

// PUT /update a user 
router.put('/:id', userController.updateUserById);

// DELETE /delete a user 
router.delete('/:id', userController.deleteUserById);


module.exports = router;
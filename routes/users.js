const express = require("express");
const router = express.Router();
const userController = require('../controllers/user-controller');
const { authorize } = require("../middleware/auth");

// all start with /users
// POST /create a new user 
router.post('/', userController.createUser);

// POST / user login
router.post('/login', userController.logInUser);

// PUT /update a user 
router.put('/', authorize , userController.updateLoggedUser);

// DELETE /delete a user 
router.delete('/', authorize , userController.deleteLoggedUser);


// remove the /:id since we are using auth and don't need the id (no req.params)
// router.delete('/:id', authorize , userController.deleteLoggedUser);
// post and delete can be the same path/endpoint because they're different methods 
module.exports = router;
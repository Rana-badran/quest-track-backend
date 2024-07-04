const {User} = require('../models/index.js');

const createUser = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      // use bcrypt to hash password before saving user (hash and another method maybe method)
      const newUser = await User.create({ firstName, lastName, email, password });
      // create a token using jsonwebtoken
      // search npm json webtoken (sign and decode methods) 
      res.status(201).json(newUser);
      // would also include the token with the response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: ' Server Error' });
    }
  };

  const logInUser = async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({where: {email: email}});
      // the key is the word email and the body is email variable. if the same word you can write it once
      if (user) {
        // decode password from database - use library methods (.hash and another)
        if (password === user.password) {
          // would need to create a token and it would need to be included in the response below 
          res.status(200).json(user);
          return
         } else {
          res.status(403).json({error: "incorrect password"})
          return
         }  
      } else {
        res.status(404).json({ error: 'An account with that email does not exist' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  };

  const updateUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, password } = req.body;
      const user = await User.findByPk(id);
      if (user) {
        user.firstname = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        await user.save();
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  };

  const deleteUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



  module.exports = {
    createUser,
    logInUser ,
    updateUserById,
    deleteUserById 
  }
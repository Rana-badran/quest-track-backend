const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const {User} = require('../models/index.js');

const createUser = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      // use bcrypt to hash password before saving user (.hash and .compare method)
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({ firstName, lastName, email, password:hashedPassword });
      // create a token using jsonwebtoken
      const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET);
      // search npm json webtoken (sign and decode methods) 
      res.cookie("questToken", token, {
        maxAge: 24*60*60*1000*14
      })
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
      console.log(user);
      // the key is the word email and the body is email variable. if the same word you can write it once
      if (user) {
        // decode password from database - use library methods (.hash and .compare)
        const isMatch = await bcrypt.compare(password, user.dataValues.password);
        console.log(isMatch);
        if (isMatch) {
          // genrate JWT token
          const token = jwt.sign({ id: user.dataValues.id}, process.env.JWT_SECRET);
          res.cookie("questToken", token, {
            maxAge: 24*60*60*1000*14
          })
          res.status(200).json( user);
        }       
        // if (password === user.password) {
        //   // would need to create a token and it would need to be included in the response below 
        //   res.status(200).json(user);
        //   return
        //  } 
        else {
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
    // checking if we are getting verified user
    console.log("updateuser", req.loggedUser);
    try {
      // const { id } = req.params;
      const { firstName, lastName, email, password } = req.body;
      // const user = await User.findByPk(id);
      if (req.loggedUser) {
        // if authentication middleware worked
        req.loggedUser.firstname = firstName;
        req.loggedUser.lastName = lastName;
        req.loggedUser.email = email;
        // user.password = password;
        if (password) {
          req.loggedUser.password = await bcrypt.hash(password,10)
        }
        await req.loggedUser.save();
        res.status(200).json(req.loggedUser);
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
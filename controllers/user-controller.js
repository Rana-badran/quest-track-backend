const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const {User} = require('../models/index.js');

const createUser = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      // use bcrypt to hash password before saving user (.hash 'increption' and .compare method)
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // user.create saves the password + other properties once its been hashed
      const newUser = await User.create({ firstName, lastName, email, password:hashedPassword });
      console.log("newuser", newUser);
      // create a token using jsonwebtoken
      const token = jwt.sign({ id: newUser.dataValues.userId}, process.env.JWT_SECRET);
      // search npm json webtoken (sign 'to create the token' and uses something unique 'id', same secret to sign and verify the token and decode methods) 
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
        // consol log user variable: puts in user in datavalues (sequelize specific)
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

  const updateLoggedUser = async (req, res) => {
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
        await User.update(req.loggedUser,{where:{userId:req.loggedUser.userId}});
        res.status(200).json(req.loggedUser);
      } else {
        res.status(403).json({ error: 'User not authorized' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  };

  const deleteLoggedUser = async (req, res) => {
    try {
      // const { id } = req.params;
      // const user = await User.findByPk(id);
      // will use the middleware/ update in the routes file and update req.logged user 
      if (req.loggedUser) {
        await req.loggedUser.destroy();
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
    updateLoggedUser,
    deleteLoggedUser 
  }
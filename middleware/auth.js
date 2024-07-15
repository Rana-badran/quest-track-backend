const jwt = require('jsonwebtoken');
const { User } = require('../models');
// get id of the user from the token and get the user using that id
// parameters for middleware function req,res/next (done uuthorizing and move to next steps)
const authorize = async (req, res, next)=> {
    console.log("cookies", req.cookies);
try { 
    const token = req.cookies.questToken
    // checking the cookies 
    // req.cookies={questToken:"blablablah"} if the user logged in then this is what's in the  questToken
    if (token) {
        console.log("token", token);
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log("decoded", decoded);
        // jwt to create when log in and decode the token once logged in 
        // decoded is equal to tge object that was passed in to jwt.sign
        const verifiedUser = await User.findByPk(decoded.id)
        // if verified user is truthy can we modify the request to show that a user thats logged in
        // when created the account/token --> const token = jwt.sign({ id: newUser.id}, process.env.JWT_SECRET);
        // decoded.id --> one property 'id' when the token is verified 
        if (verifiedUser) {
            req.loggedUser = verifiedUser.dataValues
            // verifiedUser --> {dataVales:{id:1, firstName:"bob"}} (from usercontroller after logging in)
            // req.(what we want to call), when we pass to the next function, this verified user will be attached to the user 
            // make up loggedUser as the property to contain the user that's been verified and logged in
            // this only works if there is a token and we can find the user --> then we cant get req.loggedUser (the user that's been found findbyPK)
        }
    }
    // will make it easy for the controller to determine whats next
    next()

}
catch {res.status(500).json({error:"server not authorized"})

}
}
module.exports={authorize}
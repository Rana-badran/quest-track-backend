const jwt = require('jsonwebtoken');
const { User } = require('../models');
// get id of the user from the token and get the user using that id
// parameters for middleware function req,res/next (done uuthorizing and move to next steps)
const authorize = async (req, res, next)=> {
try { 
    const token = req.cookies.questToken
    if (token) {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // decoded is equal to tge object that was passed in to jwt.sign
        const verifiedUser = await User.findByPk(decoded.id)
        // if verified user is truthy can we modify the request to show that a user thats logged in
        if (verifiedUser) {
            req.loggedUser = verifiedUser
            // req.(what we want to call), when we pass to the next function, this verified user will be attached to the user 
            // this only works if there is a token and we can find the user --> then we cant get req.loggedUser 
        }
    }
    // will make it easy for the controller to determine whats next
    next()

}
catch {res.status(500).json({error:"server not authorized"})

}
}
module.exports={authorize}
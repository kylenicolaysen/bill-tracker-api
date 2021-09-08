/*
Middleware function that verifies the 
token prior to executing sensitive routes.
*/
const jwt = require('jsonwebtoken')
const User = require('../models/user')


module.exports = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '')
  if (token === undefined) return res.status(401).send('User not found. Please provide valid authorization.')
  try {    
    //decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //find user and attach to request
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    if (!user) throw new Error('User not found. Please provide valid authorization.')
    // req.token = token
    req.user = user
    next()
  } 
  catch (e) {
    console.log(`Authentication Error: ${e}`)
    res.status(401).send({ Error: 'Unable to authenticate.' })
  }
}
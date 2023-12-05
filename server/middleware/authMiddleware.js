const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  const {id} = req.body;
  if (
    id
  )
  {
    try {

      // Verify token
      const decoded = jwt.verify(id, process.env.JWT_SECRET);  
      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized!!!')
    }
  }

  if (!id) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }

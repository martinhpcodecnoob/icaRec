const User = require("../models/User")

const checkUserExistence = async (req, res, next) => {
    const userId = req.params.userId
    if (!userId) {
      return res.status(400).json({ 
        message: 'Missing userId parameter'
      })
    }
    try {
      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ 
            message: 'User not found'
        })
      }
      req.user = user
      next()
    } catch (error) {
      console.log(error)
      return res.status(500).json({ 
        message: 'Server Error',
        error
      })
    }
  }

  module.exports = {
    checkUserExistence,
}
  
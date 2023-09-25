const Account = require("../models/Account")
const User = require("../models/User")

const update_account_by_user = async (req, res) => {
    try {
      const { userId, newAccount, isRegistered } = req.body

      if (!userId) {
        return res.status(400).json({ updated: false, message: 'User ID is required.' })
      }
  
      if (typeof newAccount !== 'boolean') {
        console.log("newAccount bool")
        return res.status(400).json({ updated: false, message: 'The value of "newAccount" must be true or false.' })
      }
  
      if (typeof isRegistered !== 'boolean') {
        console.log("isRegistered bool")
        return res.status(400).json({ updated: false, message: 'The value of "isRegistered" must be true or false.' })
      }

      const existingUser = await User.findById(userId)
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" })
      }

      const updateData = {}
  
      if (newAccount !== undefined) {
        updateData.newAccount = newAccount
      }
      
      if (isRegistered !== undefined) {
        updateData.isRegistered = isRegistered
      }

      await Account.findOneAndUpdate(
        {userId: userId},
        updateData,
        { new: true } 
      )
  
      return res.status(200).json({ updated: true, message: "Account updated successfully." })
    } catch (error) {
      return res.status(500).json({
        updated: false,
        message: "Error updating account",
        error
      })
    }
  }

  module.exports = {
    update_account_by_user,
}
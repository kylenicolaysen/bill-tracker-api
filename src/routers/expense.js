const express = require('express')
const Expense = require('../models/expense')
const auth = require('../middleware/auth')
const router = new express.Router()

//CREATE EXPENSE
router.post('/expense', auth, async (req, res) => {
  const expense = new Expense({
    ...req.body,
    owner: req.user._id
  })
  try {
    await expense.save()
    res.status(201).send(expense)
  } catch (e) {
    res.status(400).send(e)
  }
})

//GET EXPENSES
//UPDATE EXPENSE
//DELETE EXPENSE

module.exports = router
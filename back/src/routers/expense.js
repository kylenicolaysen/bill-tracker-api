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

//GET ALL EXPENSES OF USER
router.get('/expenses', auth, async (req, res) => {
  try {
    await req.user.populate({
      path: 'expenses'
    }).execPopulate()
    res.send(req.user.expenses)
  } catch(e) {
    res.status(500).send(e)
  }
})
//GET EXPENSE by ID
router.get('/expense/:id', auth, async (req, res) => {
  const _id = req.params.id
  console.log(_id)
  try {
    const expense = await Expense.findOne({_id, owner: req.user._id})
    console.log(expense)
    if(!expense) {
      return res.status(404).send()
    }
    res.send(expense)
  } catch(e) {
    res.status(500).send()
  }
})

//UPDATE EXPENSE
router.patch('/expense/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'amount', 'frequency']
  const isValidUpdate = updates.every((update) => {
    return allowedUpdates.includes(update)
  })
  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid Updates' })
  }
  const _id = req.params.id
  try {
    const expense = await Expense.findOne({ _id, owner: req.user._id })
    if(!expense) {
      return res.status(404).send('No expense found.')
    }
    updates.forEach((update) => expense[update] = req.body[update])
    await expense.save()
    res.send(expense)
  } catch (e) {
    res.status(400).send(e)
  }
})

//DELETE EXPENSE
router.delete('/expense/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id })
    if(!expense) {
      return res.status(404).send()
    }
    res.send(expense)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
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
  console.log('CREATE EXPENSE: ', expense)
  try {
    await expense.save()
    res.status(201).send(expense)
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: e.Error
    })
  }
})

//GET ALL EXPENSES OF USER
router.get('/expenses', auth, async (req, res) => {
  console.log('GET ALL EXPENSES')
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
  console.log('GET EXPENSE')
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
  console.log('UPDATE EXPENSE')
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
  console.log('DELETE EXPENSE')
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
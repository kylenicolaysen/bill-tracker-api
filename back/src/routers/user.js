const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router =new express.Router()

//CREATE NEW USER
router.post('/user', async (req, res) => {
  console.log('SIGNUP ROUTE')
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ token, user })
    // res.header('x-auth-token', token).status(201).send(user)
  }
  catch (e) {
    res.status(400).send(e)
  }
})

//LOGIN USER
router.post('/user/login', async (req, res) => {
  console.log('LOGIN ROUTE')
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send({ Error: `Errror: ${e}` })
  }
})

//LOGOUT USER CURRENT SESSION
router.post('/user/logout', auth, async (req, res) => {
  console.log('LOGOUT ROUTE')
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

//LOGOUT USER ALL SESSIONS
router.post('/user/logoutAll', auth, async (req, res) => {
  console.log('LOGOUT ALL')
  try {
    req.user.tokens = [],
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
} )

//GET USER 
router.get('/user', auth, async (req, res) => {
  console.log('GET USER')
  res.send(req.user)
})

//UPDATE USER
router.patch('/user', auth, async (req, res) => {
  console.log('UPDATE USER')
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password']
  if(!(updates.every((update) => allowedUpdates.includes(update)))) {
    return res.status(400).send({error: 'Invalid updates'})
  }
  try {
    const user = req.user
    if (!user) {
      return res.status(404).send()
    }
    updates.forEach((update) => user[update] = req.body[update])
    await user.save()
    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

//DELETE USER
router.delete('/user', auth, async (req, res) => {
  console.log('DELETE USER')
  try {
    await req.user.deleteOne()
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
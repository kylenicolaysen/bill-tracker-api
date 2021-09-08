const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const expenseRouter = require('./routers/expense')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(expenseRouter)

module.exports = app
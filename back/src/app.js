const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const expenseRouter = require('./routers/expense')

const app = express()

app.use(cors({
  origin: 'http://localhost:8080'
}))
app.use(express.json())
app.use(userRouter)
app.use(expenseRouter)

module.exports = app
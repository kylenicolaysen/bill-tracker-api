const mongoose = require('mongoose')

// 'mongodb://127.0.0.1:27017/bill-tracker'
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
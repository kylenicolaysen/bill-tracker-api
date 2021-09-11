const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: false
  },
  frequency: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
})

expenseSchema.pre('save', function (next) {
  console.log('pre-save expense')
  const frequencyOption = [ 'day', 'week', 'month', 'year' ]
  const expense = this
  if(expense.isModified('frequency') && (frequencyOption.find((freq) => expense.frequency === freq) === undefined)) {
    return next(new Error('invalid FFF'))
  }
  next()
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense
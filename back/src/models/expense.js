const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  details: {
    type: String,
    trim: true
  },
  amount: {
    type: Number,
    required: false,
    minimum: 0,
    default: 0
  },
  frequency: {
    type: String,
    required: false
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
  const validFrequencies = [ 'day', 'week', 'month', 'year' ]
  const expense = this
  if(expense.isModified('frequency') && (validFrequencies.find((freq) => expense.frequency === freq) === undefined)) {
    return next(new Error('invalid frequency'))
  }
  next()
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense
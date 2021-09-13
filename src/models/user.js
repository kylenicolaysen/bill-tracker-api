const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Expense = require('./expense')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Please use valid email')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error(`Password must be more secure.`)
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
}, {
  timestamps: true
})

userSchema.virtual('expenses', {
  ref: 'Expense',
  localField: '_id',
  foreignField:'owner'
})

userSchema.methods.generateAuthToken = async function () {
  const id = this._id.toString()
  const token = jwt.sign({_id: id}, process.env.JWT_SECRET)
  this.tokens = this.tokens.concat({ token })
  // this.token = token
  this.save()
  return token
}

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.tokens

  return userObject
}

//Check for user match with email/password
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await mongoose.model("User", userSchema).findOne({ email })
  if (!user) {
    throw new Error('Email or password are incorrect')
  }
  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    throw new Error('Email or password are incorrect')
  }
  return user
}

//hash plain text password before saving to database
userSchema.pre('save', async function (next) {
  const user = this

  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }  
  next()
})

//Delete user expenses when user is removed
userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  const user = this
  console.log(user)
  await Expense.deleteMany({ owner: user._id })
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
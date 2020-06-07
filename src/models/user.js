const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 200,
    required: true
  }
})

module.exports = mongoose.model('user', userSchema)

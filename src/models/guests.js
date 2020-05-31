const mongoose = require('mongoose')

const guestsSchema = new mongoose.Schema({
  familyName: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  guestsNumber: {
    type: Number,
    maxlength: 3,
    required: true
  },
  familyEmail: {
    type: String,
    maxlength: 50,
    required: true
  },
  confirmedGuest: {
    type: Boolean,
    required: false
  },
  additionalRequest: {
    type: String,
    maxlength: 100,
    required: false
  }
})

module.exports = mongoose.model('Guests', guestsSchema)

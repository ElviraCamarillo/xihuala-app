const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  location: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true
  },
  nameEvent: {
    type: String,
    maxlength: 50,
    required: true
  },
  eventDate: {
    type: Date
  },
  eventTime: {
    type: String
  },
  contactPhone: {
    type: String,
    maxlength: 10,
    required: true
  },
  guests: {
    type: Array
  },
  buget: {
    type: Number
  },
  expenses: {
    type: Array
  }
})

module.exports = mongoose.model('Events', eventSchema)

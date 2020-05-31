const mongoose = require('mongoose')

const eventsSchema = new mongoose.Schema({
  location: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true
  },
  coupleNames: {
    type: String,
    maxlength: 50,
    required: true
  },
  eventDate: {
    type: String,
    maxlength: 10,
    required: true
  },
  timeDate: {
    type: String,
    maxlength: 5,
    required: true
  },
  contactPhone: {
    type: Number,
    maxlength: 10,
    required: true
  }
})

module.exports = mongoose.model('Events', eventsSchema)

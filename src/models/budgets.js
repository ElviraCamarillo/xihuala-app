const mongoose = require('mongoose')

const budgetsSchema = new mongoose.Schema({
  initialBudget: {
    type: Number,
    minlength: 1,
    maxlength: 15,
    required: true
  }
})

module.exports = mongoose.model('Budgets', budgetsSchema)

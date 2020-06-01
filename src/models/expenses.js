const mongoose = require('mongoose')

const expensesSchema = new mongoose.Schema({
  expenseDescription: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  expenseAmount: {
    type: Number,
    maxlength: 10,
    required: true
  }
})

module.exports = mongoose.model('Expenses', expensesSchema)

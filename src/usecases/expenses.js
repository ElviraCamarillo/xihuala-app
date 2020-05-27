const Expenses = require('../models/expenses')

function getAllExpenses () {
  return Expenses.find()
}

function getExpensesByID (id) {
  return Expenses.findById(id)
}

function createExpenses (expensesData) {
  return Expenses.create(expensesData)
}

function deleteExpensesById (id) {
  return Expenses.findByIdAndDelete(id)
}

function updateExpensesById (id, NewExpensesData) {
  return Expenses.findByIdAndUpdate(id, NewExpensesData)
}

module.exports = {
  getAllExpenses,
  getExpensesByID,
  createExpenses,
  deleteExpensesById,
  updateExpensesById
}
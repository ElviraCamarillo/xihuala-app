const Budget = require('../models/budgets')

function getAllBudgets () {
  return Budget.find()
}

function getBudgetByID (id) {
  return Budget.findById(id)
}

function createBudget (budgetData) {
  return Budget.create(budgetData)
}

function deleteBudgetById (id) {
  return Budget.findByIdAndDelete(id)
}

function updateBudgetById (id, NewBudgetData) {
  return Budget.findByIdAndUpdate(id, NewBudgetData)
}

module.exports = {
  getAllBudgets,
  getBudgetByID,
  createBudget,
  deleteBudgetById,
  updateBudgetById
}

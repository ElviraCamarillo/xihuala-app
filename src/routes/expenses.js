const express = require('express')

const event = require('../usecases/expenses')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const allExpenses = await event.getAllExpenses()
    res.json({
      message: 'All expenses',
      data: {
        event: allExpenses
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const oneExpense = await event.getExpensesByID(id)
    res.json({
      success: true,
      message: `get expense with id ${id}`,
      data: {
        event: oneExpense
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const NewExpense = await event.createExpenses(req.body)
    res.json({
      success: true,
      message: 'New Expense',
      data: {
        event: NewExpense
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const expenseDeleted = await event.deleteExpensesById(id)
    res.json({
      success: true,
      message: `expense with id ${id} has been deleted`,
      data: {
        event: expenseDeleted
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const expenseUpdated = await event.updateExpensesById(id, req.body)
    res.json({
      success: true,
      message: `Expense with id ${id}, has been updated`,
      data: {
        expenseUpdated
      }
    })
  } catch (error) {
    res.status(400)
    res.json ({
      success: false,
      error: error.message
    })
  }
})

module.exports = router
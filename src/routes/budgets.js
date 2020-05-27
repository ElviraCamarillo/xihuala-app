const express = require('express')

const event = require('../usecases/budgets')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const allBudgets = await event.getAllBudgets()
    res.json({
      message: 'All budget',
      data: {
        event: allBudgets
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
    const oneBudget = await event.getBudgetByID(id)
    res.json({
      success: true,
      message: `get budget with id ${id}`,
      data: {
        event: oneBudget
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
    const NewBudget = await event.createBudget(req.body)
    res.json({
      success: true,
      message: 'New Budget',
      data: {
        event: NewBudget
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
    const budgetDeleted = await event.deleteBudgetById(id)
    res.json({
      success: true,
      message: `budget with id ${id} has been deleted`,
      data: {
        event: budgetDeleted
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
    const budgetUpdated = await event.updateBudgetById(id, req.body)
    res.json({
      success: true,
      message: `Budget with id ${id}, has been updated`,
      data: {
        budgetUpdated
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
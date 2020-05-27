const express = require('express')

const eventRouter = require ('./routes/events')
const guestsRouter = require ('./routes/guests')
const expensesRouter = require ('./routes/expenses')
const budgetsRouter = require ('./routes/budgets')

const app = express()

app.use(express.json())

app.use('/events', eventRouter)
app.use('/guests', guestsRouter)
app.use('/expenses', expensesRouter)
app.use('/budgets', budgetsRouter)

module.exports = app
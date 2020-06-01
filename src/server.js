
const express = require('express')
const cors = require('cors')

const usersRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const eventRouter = require('./routes/events')
const guestsRouter = require('./routes/guests')
const expensesRouter = require('./routes/expenses')
const budgetsRouter = require('./routes/budgets')

const app = express()

// middleware CORS
app.use(cors())

app.use(express.json())

// Router -> Users
app.use('/users', usersRouter)

// Router -> Auth
app.use('/auth', authRouter)

// Router -> Event, guest, expense & budgets
app.use('/events', eventRouter)
app.use('/guests', guestsRouter)
app.use('/expenses', expensesRouter)
app.use('/budgets', budgetsRouter)

module.exports = app

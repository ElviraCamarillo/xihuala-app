
const express = require('express')
const cors = require('cors')

const usersRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const eventRouter = require('./routes/events')

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

module.exports = app

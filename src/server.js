const express = require('express')

const eventRouter = require ('./routes/events')
const guestsRouter = require ('./routes/guests')

const app = express()

app.use(express.json())

app.use('/events', eventRouter)
app.use('/guests', guestsRouter)

module.exports = app
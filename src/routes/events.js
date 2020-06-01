const express = require('express')

const event = require('../usecases/events')
const auth = require('../middleware/auth')

const router = express.Router()

router.use(auth)

router.get('/', async (req, res) => {
  try {
    const allEvents = await event.getAllEvents()
    res.json({
      message: 'All events',
      data: {
        event: allEvents
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
    const oneEvent = await event.getEventByID(id)
    res.json({
      success: true,
      message: `get event with id ${id}`,
      data: {
        event: oneEvent
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
    const NewEvent = await event.createEvent(req.body)
    res.json({
      success: true,
      message: 'New Event',
      data: {
        event: NewEvent
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
    const eventDeleted = await event.deleteEventById(id)
    res.json({
      success: true,
      message: `event with id ${id} has been deleted`,
      data: {
        event: eventDeleted
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
    const eventUpdated = await event.updateEventById(id, req.body)
    res.json({
      success: true,
      message: `Event with id ${id}, has been updated`,
      data: {
        eventUpdated
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

module.exports = router

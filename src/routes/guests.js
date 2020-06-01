const express = require('express')

const event = require('../usecases/guests')
const auth = require('../middleware/auth')

const router = express.Router()

router.use(auth)

router.get('/', async (req, res) => {
  try {
    const allGuests = await event.getAllGuests()
    res.json({
      message: 'All guests',
      data: {
        event: allGuests
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
    const oneGuests = await event.getGuestsByID(id)
    res.json({
      success: true,
      message: `get guests with id ${id}`,
      data: {
        event: oneGuests
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
    const NewGuests = await event.createGuests(req.body)
    res.json({
      success: true,
      message: 'New Guests',
      data: {
        event: NewGuests
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
    const guestDeleted = await event.deleteGuestsById(id)
    res.json({
      success: true,
      message: `guest with id ${id} has been deleted`,
      data: {
        event: guestDeleted
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
    const guestUpdated = await event.updateGuestsById(id, req.body)
    res.json({
      success: true,
      message: `Guest with id ${id}, has been updated`,
      data: {
        guestUpdated
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

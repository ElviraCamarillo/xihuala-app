const express = require('express')

const event = require('../usecases/events')
// const auth = require('../middleware/auth')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const router = express.Router()

// router.use(auth)
// /event -> getByIdUser
router.get('/user/:id', async (request, response) => {
  try {
    var { id } = request.params
    const eventUserData = await event.getByIdUser(id)
    console.log('eventUserData', eventUserData)
    response.json({
      success: true,
      message: 'Events by user',
      data: {
        events: eventUserData
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      message: error.message
    })
  }
})

// GET -> All events
router.get('/', async (request, response) => {
  try {
    const allEvents = await event.getAllEvents()
    response.json({
      success: true,
      message: 'Todos los eventos',
      data: {
        event: allEvents
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// GET -> Evet by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    console.log('id event api', id)
    const oneEvent = await event.getEventByID(id)
    response.json({
      success: true,
      message: `get event with id: ${id}`,
      data: {
        event: oneEvent
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// POST new Event -> Registration flow
router.post('/', async (request, response) => {
  try {
    const NewEvent = await event.createEvent(request.body)
    response.json({
      success: true,
      message: 'Add new Event',
      data: {
        event: NewEvent
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// DELETED event by id
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const eventDeleted = await event.deleteEventById(id)
    response.json({
      success: true,
      message: `event with id ${id} has been deleted`,
      data: {
        event: eventDeleted
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// PUT event by id
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const eventUpdated = await event.updateEventById(id, request.body)
    response.json({
      success: true,
      message: `Event with id ${id}, has been updated`,
      data: {
        eventUpdated
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// PUT event update guest
router.put('/:id/confirmguest', async (request, response) => {
  try {
    const { id } = request.params
    console.log('confirm', id, request.body)
    const eventUpdated = await event.updateGuestByMail(id, request.body)
    response.json({
      success: true,
      message: `Guest with email ${request.body.emailFamily}, has been updated`,
      data: {
        eventUpdated
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// PUT event a new guest
router.put('/:id/addguest', async (request, response) => {
  try {
    const { id } = request.params
    console.log(id, request.body)
    const eventAdded = await event.addEventGuest(id, request.body)
    const infoEvent = await event.getEventByID(id)
    var { nameEvent, eventDate, eventTime, location } = infoEvent

    const msg = {
      to: request.body.emailFamily,
      from: 'xihualaapp@gmail.com',
      subject: `Te han invitado al evento ${nameEvent}`,
      text: 'Te han invitado a un evento',
      html: `
        <strong>Te han invitado al evento ${nameEvent}</strong>
        <p>Ubicación: <strong>${location}</strong></p>
        <p>Fecha: <strong>${eventDate}</strong> a las <strong>${eventTime}</strong>hrs </p>
        <p>Por favor confirma tu asistencia</p>
        <a href='http://xihuala-app.mybluemix.net/event/${id}/confirm?email=${request.body.emailFamily}'>Confirmar</a>
      `
    }
    sgMail.send(msg)
    response.json({
      success: true,
      message: `Guest with email ${request.body.emailFamily}, has added`,
      data: {
        eventAdded
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// PUT event a new expense
router.put('/:id/addexpense', async (request, response) => {
  try {
    const { id } = request.params
    console.log(id, request.body)
    const eventAdded = await event.addExpense(id, request.body)
    response.json({
      success: true,
      message: `Expense  ${request.body.concept}, has added`,
      data: {
        eventAdded
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// PUT event delete expense
router.put('/:id/deleteExpense', async (request, response) => {
  try {
    const { id } = request.params
    console.log(id, request.body)
    const eventAdded = await event.deleteExpense(id, request.body)
    response.json({
      success: true,
      message: `Expense  ${request.body.expenseDescription}, has removed`,
      data: {
        eventAdded
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message
    })
  }
})

module.exports = router

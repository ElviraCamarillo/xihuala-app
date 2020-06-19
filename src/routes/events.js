const express = require('express')
const moment = require('moment')
moment.locale('es')

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

    var date = moment(eventDate)
    var dateComponent = date.format('DD-MM-YYYY')

    const msg = {
      to: request.body.emailFamily,
      from: 'xihualaapp@gmail.com',
      subject: `Te han invitado al evento ${nameEvent}`,
      text: 'Te han invitado a un evento',
      html: `
        <body style="font-family: sans-serif, Helvetica, Arial !important">
        <table align="center" cellpadding="0" cellspacing="0" style="Margin: 0 auto; width: 100%; max-width: 640px;" role="Invite">

          <tr>
            <td align="center" style="padding-top: 46px; padding-bottom: 30px; background-color: #F8F5F4;">
              <a href="http://xihuala-app.mybluemix.net/"><img src='https://i.ibb.co/Mnq7Sb3/logo.png' alt="Xihuala App" width="141" style="width: 100%; max-width: 241px; height: auto; display: block; border: 0;" title="Xihuala App" target="_blank" /></a>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-top: 30px; padding-bottom: 43px; background-color: #F8F5F4;">
              <p style="margin: 0; padding-bottom: 20px; font-size: 20px; line-height: 22px; color: rgba(0,0,0,0.87)">¡NOS CASAMOS!</p>
              <p class="names" style="margin: 0; padding: 0; font-size: 35px; line-height: 31px; color: #7342BF; margin-bottom: 19px; font-family: sans-serif">${nameEvent}</p>
            </td>
          </tr>

          <tr>
            <td align="center" class="backgroundm" width="640" style="background-image: url('https://i.ibb.co/HYKNbPJ/bg.png');background-size: cover; background-position: bottom; background-repeat: no-repeat">
              <img src="https://i.ibb.co/phsxNXN/bg01.png" width="548" style="width: 100%; max-width: 548px; height: auto; border: 0; box-shadow: 0 10px 10px rgba(68, 31, 125, .2)" title="Novios" alt="Background" />
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-top: 39px; padding-bottom: 40px; line-height: 22px; font-size: 16px; padding-left: 46px; padding-right: 46px; background-color: #F8F5F4;">
              <p class="names" style="padding: 0; margin: 0; margin-bottom: 35px; color: #7342BF; font-size: 35px; line-height: 31px; text-align: center;font-family: sans-serif">${nameEvent}</p>
              <p style="padding: 0; margin: 0; line-height: 25px; font-size: 20px; color: rgba(0,0,0,0.87);; margin-bottom: 45px;font-family: sans-serif">Nos sentimos muy felices y queremos compartir con ustedes el día de nuestra unión</p>
              <p style="padding: 0; margin: 0; line-height: 22px; font-size: 25px; color: rgba(0,0,0,0.87);; margin-bottom: 45px;font-family: sans-serif">${dateComponent}</p>
              <p style="padding: 0; margin: 0; line-height: 22px; font-size: 25px; color: rgba(0,0,0,0.87);; margin-bottom: 45px;font-family: sans-serif">${eventTime}hrs</p>
              <p style="padding: 0; margin: 0; line-height: 22px; font-size: 25px; color: rgba(0,0,0,0.87);; margin-bottom: 45px;font-family: sans-serif">${location}</p>
              <a style="height: 50px; width: 200px; border-radius: .5rem;border: none; line-height: 3rem; color: #F8F5F4; font-size: 15px;font-family: sans-serif" href='http://xihuala-app.mybluemix.net/event/${id}/confirm?email=${request.body.emailFamily}'>Confirmar</a>
            </td>
          </tr>

          <tr>
            <td style="display: flex; justify-content: space-between; align-items: center; padding: 0 10px; height: 40px; font-family: Helvetica, Arial, sans-serif; line-height: 13px; font-size: 13px; color: #F8F5F4; text-align: left; background-color: #7342BF">
              <div style="padding: 0; Margin: 0px;">
                <a href="http://xihuala-app.mybluemix.net/" title="Xihuala App" style="color: #F8F5F4; text-decoration: none;" target="_blank">© 2020 XIHUALA APP.</a>          
              </div>
              <div style="padding: 0; Margin: 0px;">
                <a href="http://xihuala-app.mybluemix.net/privacidad" title="Privacy Policy" style="color: #F8F5F4; text-decoration: none;" target="_blank">Aviso de Privacidad</a>
              </div>
            </td>
          </tr>

        </table>
        </body>
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

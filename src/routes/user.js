const express = require('express')
require('dotenv').config()

const users = require('../usecases/user')
const auth = require('../middleware/auth')

const router = express.Router()

// API sendgrid
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const crypto = require('crypto')
const secret = 'abcdfgh'
const algorithmCrypto = 'sha256'

// /users -> validateSession()
router.get('/validate-session', async (request, response) => {
  try {
    const token = await users.validateSession(request.headers.authorization)
    response.json({
      success: true,
      message: 'Session Validated',
      data: {
        token
      }
    })
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      message: 'Invalid session'
    })
  }
})

// /users -> getUserSession()
router.get('/getsession', async (request, response) => {
  try {
    console.log('enter get session')
    const sessionData = await users.getUserSession(request.headers.authorization)
    response.json({
      success: true,
      message: 'data Session ',
      data: {
        session: sessionData
      }
    })
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      message: 'Invalid session'
    })
  }
})

// POST /users/signup -> Registration flow
router.post('/signup', async (request, response) => {
  try {
    console.log(request.body)
    const { email } = request.body
    const hash = crypto.createHmac(algorithmCrypto, secret)
      .update(email)
      .digest('hex')
    request.body.token = hash
    console.log('has new user', hash)

    const newUser = await users.signup(request.body)
    console.log('new user response', newUser)
    const msgNewUser = {
      to: newUser.email,
      from: 'xihualapp@gmail.com',
      subject: 'Bienvenido a Xihuala App',
      html:
      `
        <table align="center" style="max-width: 400px; margin-left: auto; margin-right: auto">
          <tbody >
            <tr>
              <td>
                <div style="border-radius: 4px;box-shadow: 0 4px 10px rgba(0,0,0,.3);padding: 20px;border: 1px solid rgba(0,0,0,.1)">
                  <h2>Bienvenido <br> ${newUser.name} </h2>
                  <p>Te has registrado en <b>Xihuala App</b> con el correo ${newUser.email}</p>
                  <p>Para empezar a organizar tu boda, de forma rápida y segura entra al sitio web </p>
                  <p> <a href='http://xihuala-app.mybluemix.net/confirmuser/${hash}'>Verifica tu correo</a></p>
                </div>
              </tr>
            </td>
          </tbody>
        </table >
      `
    }
    sgMail.send(msgNewUser)
    response.json({
      success: true,
      message: 'The user has been registered',
      data: {
        User: newUser
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

// GET an User
router.get('/:id', auth, async (request, response) => {
  try {
    const { id } = request.params
    const user = await users.getById(id)
    response.json({
      succes: true,
      message: 'User Detail',
      data: {
        user: user
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      succes: false,
      error: error.message
    })
  }
})

// PUT User by id
router.patch('/:id', auth, async (request, response) => {
  try {
    const { id } = request.params
    const userUpdated = await users.updateUserById(id, request.body)
    response.json({
      success: true,
      message: `User with id ${id}, has been updated`,
      data: {
        userUpdated
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

// DELETE/id
router.delete('/:id', auth, async (request, response) => {
  try {
    const { id } = request.params
    const userDeleted = await users.deleteById(id)
    response.json({
      succes: true,
      message: 'El usuario ha sido borrado',
      data: {
        user: userDeleted
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      succes: false,
      error: error.message
    })
  }
})

// GET /users
router.get('/', auth, async (request, response) => {
  try {
    const allUser = await users.getAll()
    response.json({
      succes: true,
      message: 'Lista de usuarios registrados',
      data: {
        users: allUser
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      succes: false,
      error: error.message
    })
  }
})

// /validateTokenUser -> validateToken()
router.get('/confirmation/:hash', async (request, response) => {
  console.log('confirmation')
  try {
    console.log(request.params)
    const hash = request.params.hash
    const token = await users.validateMail(hash)
    response.json({
      success: true,
      message: 'Mail Validated',
      data: {
        token
      }
    })
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      message: 'Invalid session'
    })
  }
})

module.exports = router

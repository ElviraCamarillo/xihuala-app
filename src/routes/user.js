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
          <table align="center" cellpadding="0" cellspacing="0" style="Margin: 0 auto; width: 100%; max-width: 640px;" role="Invite">
            <tr>
              <td align="center" style="padding-top: 46px; padding-bottom: 30px; background-color: #F8F5F4;">
                <a href="http://xihuala-app.mybluemix.net/"><img src='https://i.ibb.co/Mnq7Sb3/logo.png' alt="Xihuala App" width="141" style="width: 100%; max-width: 241px; height: auto; display: block; border: 0;" title="Xihuala App" target="_blank" /></a>
              </td>
            </tr>
        
            <tr>
              <td align="center" style="padding-top: 30px; padding-bottom: 23px; background-color: #F8F5F4;">
                <p style="margin: 0; padding-bottom: 20px; font-size: 25px; line-height: 22px; font-weight: bold; color: rgba(0,0,0,0.87)">¡Te damos la bienvenida!</p>
              </td>
            </tr>
        
            <tr>
              <td align="center" class="backgroundm" width="640" style="background-image: url('https://i.ibb.co/HYKNbPJ/bg.png');background-size: cover; background-position: bottom; background-repeat: no-repeat">
                <img src="https://i.ibb.co/0sR75pp/bg02.png" width="548" style="width: 100%; max-width: 548px; height: auto; border: 0; box-shadow: 0 10px 10px rgba(68, 31, 125, .2)" title="Novios" alt="Background" />
              </td>
            </tr>
        
            <tr>
              <td align="center" style="padding-top: 39px; padding-bottom: 40px; line-height: 22px; font-size: 16px; padding-left: 46px; padding-right: 46px; background-color: #F8F5F4;">
                <p style="padding: 0; margin: 0; line-height: 25px; font-size: 20px; color: rgba(0,0,0,0.87);; margin-bottom: 45px;">Te has registrado en <b>Xihuala App</b> con el correo ${newUser.email}</p>
                <p style="padding: 0; margin: 0; line-height: 25px; font-size: 20px; color: rgba(0,0,0,0.87);; margin-bottom: 45px;">Para empezar a organizar tu boda, de forma rápida y segura, entra al sitio web</p>
                <p style="padding: 0; margin: 0; line-height: 25px; font-size: 20px; color: rgba(0,0,0,0.87);; margin-bottom: 45px;"><a href='http://xihuala-app.mybluemix.net/confirmuser/${hash}'>Verifica tu correo</a></p>
              </td>
            </tr>
        
            <tr>
              <td style="display: flex; justify-content: space-between; align-items: center; padding: 0 10px; height: 40px; font-family: Helvetica, Arial, sans-serif; line-height: 13px; font-size: 13px; color: #F8F5F4; text-align: left; background-color: #7342BF">
                <div style="padding: 0; Margin: 0px;">
                  <a href="http://xihuala-app.mybluemix.net/" title="Xihuala App" style="color: #F8F5F4; text-decoration: none;" target="_blank">© 2020 XIHUALA APP.</a>          
                </div>
                <div style="padding: 0; Margin: 0px;">
                  <a href="" title="Privacy Policy" style="color: #F8F5F4; text-decoration: none;" target="_blank">Aviso de Privacidad</a>
                </div>
              </td>
            </tr>
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

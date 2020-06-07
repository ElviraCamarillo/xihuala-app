const express = require('express')

const users = require('../usecases/user')

const router = express.Router()

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
    const newUser = await users.signup(request.body)
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
router.get('/:id', async (request, response) => {
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
router.put('/:id', async (request, response) => {
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
router.delete('/:id', async (request, response) => {
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
router.get('/', async (request, response) => {
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

module.exports = router

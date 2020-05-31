const express = require('express')

const users = require('../usecases/user')

const router = express.Router()

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
    response.status(404)
    response.json({
      succes: false,
      error: error.message
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

// GET one User
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
    response.status(404)
    response.json({
      succes: false,
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
    response.status(404)
    response.json({
      succes: false,
      error: error.message
    })
  }
})

module.exports = router

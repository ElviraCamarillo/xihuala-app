const express = require('express')

const users = require('../usecases/user')

const router = express.Router()

router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body
    const token = await users.login(email, password)

    response.json({
      sucess: true,
      message: 'Loged in',
      data: {
        token
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      sucess: false,
      error: error.message
    })
  }
})

module.exports = router

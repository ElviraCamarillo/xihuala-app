
const jwt = require('../lib/jwt')

function auth (request, response, next) {
  console.log('Auth Middleware')

  const { authorization: token } = request.headers
  console.log('Authorization: ', token)

  try {
    const decodedToken = jwt.verify(token)
    console.log('Decoded token:', decodedToken)
    next()
  } catch (error) {
    response.status(400)
    response.json({
      sucess: false,
      message: 'Unauthoized'
    })
  }
}

module.exports = auth

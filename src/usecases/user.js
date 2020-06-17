// Import package
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt.js')

// Import Models
const User = require('../models/user')

// Fuction for user GET
function getAll () {
  return User.find()
}

// Fuction for user signUp.
async function signup (newUserData) {
  const { email, password } = newUserData
  if (!email) throw new Error('Correo es requerido')
  if (!password) throw new Error('La contraseña es requerida')

  const userAlReadyExists = await User.findOne({ email })

  if (userAlReadyExists) throw new Error('El email ya esta registrado')
  if (password.length < 8) throw new Error('La contraseña debe tener mínimo 8 caracteres')

  const hash = await bcrypt.hash(password, 10)

  return User.create({ ...newUserData, password: hash })
}

// Fuction for user login.
async function login (email, password) {
  const user = await User.findOne({ email })
  console.log('user on login', user)
  if (!user) throw new Error('El email que no esta registrado')
  if (!user.isVerified) throw new Error('El correo electrónico no se ha valid')

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) throw new Error('Datos invalidos')

  return jwt.sign({ id: user._id })
}

// Fuction for user find by id
function getById (id) {
  return User.findById(id)
}

// Fuction for user delete by id
function deleteById (id) {
  return User.findByIdAndRemove(id)
}

// UPDATE user by Id
function updateUserById (id, NewUserData) {
  return User.findByIdAndUpdate(id, NewUserData)
}

// Validate sesion
function validateSession (token) {
  const { id } = jwt.verify(token)
  return jwt.sign({ id })
}

// Get session
async function getUserSession (token) {
  const { id } = jwt.verify(token)
  const finded = await User.findOne({ _id: id })
  const dataSession = {
    user: finded
  }
  return dataSession
}

// get session
async function validateMail (hash) {
  console.log('use case hash', hash)
  const finded = await User.findOneAndUpdate(
    { token: hash },
    { isVerified: true }
  )
  const dataSession = {
    user: finded
  }
  console.log(dataSession)
  return dataSession
}

module.exports = {
  getAll,
  signup,
  login,
  getById,
  deleteById,
  validateSession,
  getUserSession,
  updateUserById,
  validateMail
}

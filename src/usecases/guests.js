const Guests = require('../models/guests')

function getAllGuests () {
  return Guests.find()
}

function getGuestsByID (id) {
  return Guests.findById(id)
}

function createGuests (guestsData) {
  return Guests.create(guestsData)
}

function deleteGuestsById (id) {
  return Guests.findByIdAndDelete(id)
}

function updateGuestsById (id, NewGuestData) {
  return Guests.findByIdAndUpdate(id, NewGuestData)
}

module.exports = {
  getAllGuests,
  getGuestsByID,
  createGuests,
  deleteGuestsById,
  updateGuestsById
}
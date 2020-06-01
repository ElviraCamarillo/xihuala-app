const Event = require('../models/events')

function getAllEvents () {
  return Event.find()
}

function getEventByID (id) {
  return Event.findById(id)
}

function createEvent (eventData) {
  return Event.create(eventData)
}

function deleteEventById (id) {
  return Event.findByIdAndDelete(id)
}

function updateEventById (id, NewEventData) {
  return Event.findByIdAndUpdate(id, NewEventData)
}

module.exports = {
  getAllEvents,
  getEventByID,
  createEvent,
  deleteEventById,
  updateEventById
}
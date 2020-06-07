const Event = require('../models/event')

// GET all Events
function getAllEvents () {
  return Event.find()
}

// GET one event by Id
function getEventByID (id) {
  return Event.findById(id)
}

// CREATE new event
function createEvent (eventData) {
  return Event.create(eventData)
}

// DELETE event by Id
function deleteEventById (id) {
  return Event.findByIdAndDelete(id)
}

// GET event by Id User
function getByIdUser (id) {
  return Event.find({
    idUser: id
  })
}

// UPDATE event by Id
function updateEventById (id, NewEventData) {
  return Event.findByIdAndUpdate(id, NewEventData)
}

// UPDATE one guest of event by mail
function updateGuestByMail (idEvent, NewGuestData) {
  const { emailFamily, note, status } = NewGuestData
  return Event.update(
    {
      _id: idEvent,
      'guests.emailFamily': emailFamily
    },
    {
      $set: {
        'guests.$.status': status,
        'guests.$.note': note
      }
    }
  )
}

// ADD a guest to the event
function addEventGuest (idEvent, guestData) {
  return Event.update(
    {
      _id: idEvent
    },
    {
      $push: {
        guests: guestData
      }
    }
  )
}

// DELETE expense
function deleteExpense (idEvent, expenseData) {
  const { concept } = expenseData
  return Event.update(
    { _id: idEvent },
    {
      $pull: {
        expenses: { concept: concept }
      }
    },
    {
      safe: true,
      multi: true
    }
  )
}
// ADD an expense to the event
function addExpense (idEvent, expenseData) {
  return Event.update(
    {
      _id: idEvent
    },
    {
      $push: {
        expenses: expenseData
      }
    }
  )
}

module.exports = {
  getAllEvents,
  getEventByID,
  createEvent,
  deleteEventById,
  updateEventById,
  updateGuestByMail,
  addEventGuest,
  addExpense,
  deleteExpense,
  getByIdUser
}

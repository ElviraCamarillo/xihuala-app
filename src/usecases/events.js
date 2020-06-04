const Event = require('../models/event')

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

// Delete expense

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
  deleteExpense
}

const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  passengerName: String,
  from: String,
  to: String,
  departureDate: String,
  arrivalDate: String,
  phoneNumber: { type: String, unique: true }, // We'll use this to find/delete records
  emailId: String
});

module.exports = mongoose.model('Passenger', passengerSchema);
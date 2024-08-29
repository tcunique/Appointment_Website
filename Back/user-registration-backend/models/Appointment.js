// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  appointmentType: { type: String, required: true }, // New field
});

module.exports = mongoose.model('Appointment', appointmentSchema);

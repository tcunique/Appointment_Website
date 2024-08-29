const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Function to format date to YYYY-MM-DD and remove time component
const formatDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0];
};

router.post('/', async (req, res) => {
  const { name, email, date, time, appointmentType } = req.body; // Include appointmentType
  try {
    const formattedDate = formatDate(date);
    const newAppointment = new Appointment({ name, email, date: formattedDate, time, appointmentType });
    await newAppointment.save();
    res.status(201).send('Appointment saved');
  } catch (error) {
    res.status(500).send('Error saving appointment');
  }
});

router.get('/date/:date', async (req, res) => {
  const { date } = req.params;
  try {
    const formattedDate = formatDate(date);
    const appointments = await Appointment.find({ date: formattedDate });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).send('Error fetching appointments');
  }
});

module.exports = router;

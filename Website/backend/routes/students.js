/* eslint-disable prettier/prettier */
// backend/routes/students.js
const express = require('express');
const router = express.Router();

// Define your routes here
router.post('/add', (req, res) => {
  // Implement logic to add a student to the database
  // Extract data from req.body and insert into PostgreSQL
  res.json({ message: 'Student added successfully!' });
});

module.exports = router;

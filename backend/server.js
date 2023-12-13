/* eslint-disable prettier/prettier */
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors'); // Add this line

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
});

// Check database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  release();
});


// Add a new endpoint to get data from the database
app.get('/api/students', async (req, res) => {
  try {
    // Retrieve all students from the database
    const result = await pool.query('SELECT * FROM students');
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/students', async (req, res) => {
  try {
    const { rollNo, studName, cgpa, phoneNumber, city } = req.body;

    // Validate the incoming data (similar to your frontend validation)
    // ...

    // Insert the new student record into the database
    const result = await pool.query('INSERT INTO students (roll_no, name, cgpa, phone_number, city) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [rollNo, studName, cgpa, phoneNumber, city]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/api/students/:roll_no', async (req, res) => {
  try {
    const rollNoToDelete = req.params.roll_no;

    // Perform the deletion in the database based on the provided roll_no
    const result = await pool.query('DELETE FROM students WHERE roll_no = $1 RETURNING *', [
      rollNoToDelete,
    ]);

    if (result.rows.length === 0) {
      // No record found with the specified roll_no
      res.status(404).json({ error: 'Record not found or already deleted' });
    } else {
      // Record successfully deleted
      res.json({ message: 'Record deleted successfully', deletedRecord: result.rows[0] });
    }
  } catch (error) {
    console.error('Error deleting student record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 8081;

const pool = new Pool({
  user: 'postgres',
  host: '192.168.137.1',
  database: 'HostelEase',
  password: 'postgres',
  port: 5432,
});

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get('/api/test2', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT id, name, new_column1, new_column2 FROM test2');
    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/test2/add', async (req, res) => {
  const { name, new_column1, new_column2 } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO test2 (name, new_column1, new_column2) VALUES ($1, $2, $3) RETURNING id',
      [name, new_column1, new_column2]
    );
    res.json({ message: 'Data inserted successfully', insertedId: result.rows[0].id });
    client.release();
  } catch (error) {
    console.error('Error inserting data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/JinnahRooms', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM JinnahRooms WHERE hall = 'Jinnah' AND floor = 9 AND roomtype = 'Shared'");
    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/api/SharedRooms', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM SharedRooms WHERE member1 IS NULL OR member2 IS NULL OR member3 IS NULL OR member4 IS NULL OR member5 IS NULL OR member6 IS NULL");
    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/twoSeaterRoom', async (req, res) => {
  try {
    const client = await pool.connect();
    console.log('Entered');

    const result = await client.query("SELECT * FROM twoseaterroom WHERE member1 IS NULL OR member2 IS NULL");

   console.log('Query Runned');
    console.log('Result:', result.rows); 

    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/singleSeaterRoom', async (req, res) => {
  try {
    const client = await pool.connect();

    const result = await client.query("SELECT * FROM singleseater WHERE member IS NULL");

    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/sendData', (req, res) => {
  const { selectedCategory, selectedRoomCategory } = req.body;
  console.log('Received data from the client:', { selectedCategory, selectedRoomCategory });
  // Handle the received data as needed
  res.json({ message: 'Data received successfully' });
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('server side');
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


app.get('/api/extractDigits', async (req, res) => {
  const { email } = req.query;

  try {
    const client = await pool.connect();

    const result = await client.query(
      'SELECT SUBSTRING(email FROM 2 FOR 2) AS extracted_digits FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, extractedDigits: result.rows[0].extracted_digits });
    } else {
      res.status(404).json({ success: false, message: 'Email not found' });
    }

    client.release();
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// API to check if the entered email has a warning
app.post('/api/checkWarning', async (req, res) => {
  const { email } = req.body;
  try {
    // Check if the email exists in the "warnings" table
    const result = await pool.query('SELECT * FROM warnings WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      // Email found in the warnings table
      res.json({ hasWarning: true, message: 'You have a warning.' });
    } else {
      // Email not found in the warnings table
      res.json({ hasWarning: false, message: 'No warning found.' });
    }
  } catch (error) {
    console.error('Error checking warning:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 8081;

const pool = new Pool({
  user: 'postgres',
  host: '54.211.145.126',
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


// API endpoint to fetch meals for a specific day
app.get('/api/meals/:day', async (req, res) => {
  const { day } = req.params;
  console.log(day);
  console.log('entered');
  try {
    // Execute SQL query to select meals for the specified day
    const result = await pool.query('SELECT * FROM meal WHERE Days = $1', [day]);
console.log(result);
    // Send the selected meals as a JSON response
    res.json({ success: true, meals: result.rows });
    
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

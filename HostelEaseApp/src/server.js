const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 5432;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'HostelEase',
  password: 'admin',
  port: 5432,
});

app.use(express.json());


// New code for PostgreSQL integration
pool.connect()
  .then(() => {
    console.log('Database connected');
  })
  .catch(error => {
    console.error('Error connecting to database:', error.message);
  });

// New code for PostgreSQL integration
app.get('/api/test2', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM test2');
    res.json(result.rows);
  } finally {
    client.release();
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'your_database_user',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 5432,
});

app.get('/api/data', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM your_table');
    res.json(result.rows);
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

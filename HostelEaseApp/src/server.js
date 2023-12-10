// const express = require('express');
// const { Pool } = require('pg');
// const cors = require('cors');

// const app = express();
// const port = 8081;

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'HostelEase',
//   password: 'admin',
//   port: 5432,
// });

// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://192.168.43.185:8081",
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// // New code for PostgreSQL integration
// // pool.connect()
// //   .then(() => {
// //     console.log('Database connected');
// //   })
// //   .catch(error => {
// //     console.error('Error connecting to database:', error.message);
// //   });

// // New code for PostgreSQL integration
// app.get('/api/test2', async (req, res) => {
//   console.log('Entered in query mood to fetch data');
//   const client = await pool.connect();
//   try {
//     console.log('Entered in query mood to fetch data');
//     // Update the SQL query to select specific columns
//     const result = await client.query('SELECT id, name, new_column1, new_column2 FROM test2');
//     console.log('Data saved in result ', result);
//     res.json(result.rows);
//   } finally {
//     client.release();
//   }
// });

// // Express route for adding data to the "test2" table
// app.post('/api/test2/add', async (req, res) => {
//   // Extract data from the request body
//   const { id, name, new_column1, new_column2 } = req.body;

//   // Perform the insertion into the "test2" table
//   const client = await pool.connect();
//   try {
//     const result = await client.query(
//       'INSERT INTO test2 (id, name, new_column1, new_column2) VALUES ($1, $2, $3, $4)',
//       [id, name, new_column1, new_column2]
//     );

//     res.json({ message: 'Data inserted successfully' });
//   } catch (error) {
//     console.error('Error inserting data:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   } finally {
//     client.release();
//   }
// });


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 8081;

// Set up the connection pool for PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // or the IP address of your PostgreSQL server if it's not local
  database: 'HostelEase',
  password: 'admin', // Make sure to use a secure password in production
  port: 5432, // The default port for PostgreSQL
});

// Middleware for parsing JSON and handling CORS
app.use(express.json());
app.use(cors({
  origin: "*", // Allows all origins for testing, adjust in production for security
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Route for fetching data from the "test2" table
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
    const result = await client.query('INSERT INTO test2 (name, new_column1, new_column2) VALUES ($1, $2, $3) RETURNING id', [name, new_column1, new_column2]);
    res.json({ message: 'Data inserted successfully', insertedId: result.rows[0].id });
    client.release();
  } catch (error) {
    console.error('Error inserting data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


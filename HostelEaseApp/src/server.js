
// const express = require('express');
// const { Pool } = require('pg');
// const cors = require('cors');

// const app = express();
// const port = 8081;

// // Set up the connection pool for PostgreSQL
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost', // or the IP address of your PostgreSQL server if it's not local
//   database: 'HostelEase',
//   password: 'admin', // Make sure to use a secure password in production
//   port: 5432, // The default port for PostgreSQL
// });

// // Middleware for parsing JSON and handling CORS
// app.use(express.json());
// app.use(cors({
//   origin: "*", // Allows all origins for testing, adjust in production for security
//   methods: ["GET", "POST", "DELETE", "PUT"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// }));

// // Route for fetching data from the "test2" table
// app.get('/api/test2', async (req, res) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query('SELECT id, name, new_column1, new_column2 FROM test2');
//     res.json(result.rows);
//     client.release();
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.get('/api/JinnahRooms', async (req, res) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query("SELECT * FROM JinnahRooms WHERE hall = 'Jinnah' AND floor = 9 AND roomtype = 'Shared'");
//     console.log('runned');
//     res.json(result.rows);
//     client.release();
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.get('/api/SharedRooms', async (req, res) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query("SELECT * FROM SharedRooms WHERE hall = 'Jinnah' AND floor = 9 AND roomtype = 'Shared'");
//     console.log('runned');
//     res.json(result.rows);
//     client.release();
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



// app.post('/api/test2/add', async (req, res) => {
//   const { name, new_column1, new_column2 } = req.body;
//   try {
//     const client = await pool.connect();
//     const result = await client.query('INSERT INTO test2 (name, new_column1, new_column2) VALUES ($1, $2, $3) RETURNING id', [name, new_column1, new_column2]);
//     res.json({ message: 'Data inserted successfully', insertedId: result.rows[0].id });
//     client.release();
//   } catch (error) {
//     console.error('Error inserting data:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });









// // app.post('/api/test2/add', async (req, res) => {
// //   const { name, new_column1, new_column2 } = req.body;
// //   try {
// //     const client = await pool.connect();
// //     const result = await client.query('INSERT INTO test2 (name, new_column1, new_column2) VALUES ($1, $2, $3) RETURNING id', ["Ansar", "new_column1", "new_column2"]);
// //     res.json({ message: 'Data inserted successfully', insertedId: result.rows[0].id });
// //     client.release();
// //   } catch (error) {
// //     console.error('Error inserting data:', error.message);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });



// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });























const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 8081;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'HostelEase',
  password: 'admin',
  port: 5432,
});

app.use(express.json());
app.use(
  cors({
    origin: "*", // Update this to the specific origin of your client app in production
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


// app.get('/api/sharedrooms', async (req, res) => {
//   try {
//     const client = await pool.connect();
//     console.log('Entered');

//     const result = await client.query("SELECT * FROM SharedRooms WHERE member1 IS NULL AND member2 IS NULL AND member3 IS NULL AND member4 IS NULL AND member5 IS NULL AND member6 IS NULL");

//     console.log('Query Runned');
//     console.log('Result:', result.rows); // Add this line for debugging

//     res.json(result.rows);
//     client.release();
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


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

   // console.log('Query Runned');
    console.log('Result:', result.rows); // Add this line for debugging

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

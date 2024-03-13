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

    const result = await client.query("SELECT * FROM singleseater WHERE member1 IS NULL");

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

app.post('/api/applyForBooking', async (req, res) => {
  const { roomId, selectedRoomCategory } = req.body;

  try {
    const client = await pool.connect();

    // Find the selected room based on the room ID and category
    let tableName, updateQuery;

    switch (selectedRoomCategory) {
      case 'single':
        tableName = 'singleseater';
        updateQuery = `UPDATE ${tableName} 
                      SET 
                        member1 = CASE WHEN id = $1 AND member1 IS NULL THEN 'Applied' ELSE member1 END
                      WHERE id = $1`;
        break;

      case 'double':
        tableName = 'twoseaterroom';
        updateQuery = `UPDATE ${tableName} 
                      SET 
                        member1 = CASE WHEN id = $1 AND member1 IS NULL THEN 'Applied' ELSE member1 END,
                        member2 = CASE WHEN id = $1 AND member1 IS NOT NULL AND member2 IS NULL THEN 'Applied' ELSE member2 END
                      WHERE id = $1`;
        break;

      case 'shared':
        tableName = 'sharedrooms';
        updateQuery = `UPDATE ${tableName} 
                      SET 
                        member1 = CASE WHEN id = $1 AND member1 IS NULL THEN 'Applied' ELSE member1 END,
                        member2 = CASE WHEN id = $1 AND member1 IS NOT NULL AND member2 IS NULL THEN 'Applied' ELSE member2 END,
                        member3 = CASE WHEN id = $1 AND member1 IS NOT NULL AND member2 IS NOT NULL AND member3 IS NULL THEN 'Applied' ELSE member3 END,
                        member4 = CASE WHEN id = $1 AND member1 IS NOT NULL AND member2 IS NOT NULL AND member3 IS NOT NULL AND member4 IS NULL THEN 'Applied' ELSE member4 END,
                        member5 = CASE WHEN id = $1 AND member1 IS NOT NULL AND member2 IS NOT NULL AND member3 IS NOT NULL AND member4 IS NOT NULL AND member5 IS NULL THEN 'Applied' ELSE member5 END,
                        member6 = CASE WHEN id = $1 AND member1 IS NOT NULL AND member2 IS NOT NULL AND member3 IS NOT NULL AND member4 IS NOT NULL AND member5 IS NOT NULL AND member6 IS NULL THEN 'Applied' ELSE member6 END
                      WHERE id = $1`;
        break;

      default:
        throw new Error('Invalid room category');
    }

    // Use a subquery to update only the first null value
    const result = await client.query(updateQuery, [roomId]);

    // Check if any row was affected
    if (result.rowCount > 0) {
      res.json({ success: true, message: 'Booking applied successfully!' });
    } else {
      res.status(404).json({ success: false, message: 'Room not found' });
    }

    client.release();
  } catch (error) {
    console.error('Error applying for booking:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



// API endpoint to store room allocation applications
app.post('/api/storeRoomAllocationApplication', async (req, res) => {
  try {
    const { rollNumber, selectedRoomCategory, roomId } = req.body;

    // Insert the application details into the "roomAllocationApplications" table
    const result = await pool.query(
      'INSERT INTO roomAllocationApplications (roll_number, roomCategory, roomNumber) VALUES ($1, $2, $3) RETURNING *',
      [rollNumber, selectedRoomCategory, roomId]
    );

    // Check if the insertion was successful
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Application stored successfully!' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to store application' });
    }
  } catch (error) {
    console.error('Error storing room allocation application:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});




// app.post('/api/applyForBooking', async (req, res) => {
//   const { roomId, selectedRoomCategory } = req.body;

//   try {
//     const client = await pool.connect();

//     // Find the selected room based on the room ID and category
//     let tableName;
//     switch (selectedRoomCategory) {
//       case 'single':
//         tableName = 'singleseater';
//         break;
//       case 'double':
//         tableName = 'twoseaterroom';
//         break;
//       case 'shared':
//         tableName = 'sharedrooms';
//         break;
//       default:
//         throw new Error('Invalid room category');
//     }

//     // Use a subquery to update only the first null value
//     const result = await client.query(
//       `UPDATE ${tableName} 
//        SET 
//          member1 = CASE WHEN id = $1 AND member1 IS NULL THEN 'Applied' ELSE member1 END,
//          member2 = CASE WHEN id = $1 AND member1 IS NOT NULL AND member2 IS NULL THEN 'Applied' ELSE member2 END,
//          member3 = CASE WHEN id = $1 AND member1 IS NOT NULL AND member2 IS NOT NULL AND member3 IS NULL THEN 'Applied' ELSE member3 END,
//          member4 = CASE WHEN id = $1 AND member1 IS NOT NULL AND member2 IS NOT NULL AND member3 IS NOT NULL AND member4 IS NULL THEN 'Applied' ELSE member4 END,
//          member5 = CASE WHEN id = $1 AND member1 IS NOT NULL AND member2 IS NOT NULL AND member3 IS NOT NULL AND member4 IS NOT NULL AND member5 IS NULL THEN 'Applied' ELSE member5 END,
//          member6 = CASE WHEN id = $1 AND member1 IS NOT NULL AND member2 IS NOT NULL AND member3 IS NOT NULL AND member4 IS NOT NULL AND member5 IS NOT NULL AND member6 IS NULL THEN 'Applied' ELSE member6 END
//        WHERE id = $1`,
//       [roomId]
//     );

//     // Check if any row was affected
//     if (result.rowCount > 0) {
//       res.json({ success: true, message: 'Booking applied successfully!' });
//     } else {
//       res.status(404).json({ success: false, message: 'Room not found' });
//     }

//     client.release();
//   } catch (error) {
//     console.error('Error applying for booking:', error.message);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });

// ... (rest of the server code)


app.get('/api/checkRoomAllocation', async (req, res) => {
  const { rollNumber } = req.query;

  try {
    // Check in BookedStudents table
    const bookedStudentsResult = await pool.query(
      'SELECT * FROM BookedStudents WHERE rollnumber = $1',
      [rollNumber]
    );

    if (bookedStudentsResult.rows.length > 0) {
      return res.status(200).json({ message: 'You have already booked a seat.' });
    }

    // Check in roomallocationappplications table
    const roomAllocationResult = await pool.query(
      'SELECT * FROM roomallocationappplications WHERE roll_number = $1',
      [rollNumber]
    );

    if (roomAllocationResult.rows.length > 0) {
      return res.status(200).json({ message: 'Your request is under consideration.' });
    }

    // If rollNumber is not found in any table
    res.status(200).json({ message: 'Proceed to room allocation.' });
  } catch (error) {
    console.error('Error checking room allocation:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});








app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

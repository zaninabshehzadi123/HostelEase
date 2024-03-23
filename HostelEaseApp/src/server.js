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


app.post('/api/gymRegistration', async (req, res) => {
  const { email, rollNumber, batch } = req.body;
  console.log('Registering for gym:', { email, rollNumber, batch });

  try {
    const client = await pool.connect();

    // Insert data into GymRegistrationApplications table
    const result = await client.query(
      'INSERT INTO GymRegistrationApplications (email, rollnumber, batch) VALUES ($1, $2, $3)',
      [email, rollNumber, batch]
    );

    client.release();

    // Check if insertion was successful
    if (result.rowCount > 0) {
      res.status(200).json({ success: true, message: 'Registered for gym successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Error registering for gym' });
    }
  } catch (error) {
    console.error('Error inserting data into database:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
app.get('/api/checkGymRegistration', async (req, res) => {
  const { rollNumber } = req.query;
  console.log('Checking gym registration for roll number:', rollNumber);

  try {
    const client = await pool.connect();

    // Query to check if the roll number exists in the GymRegistrationApplications table
    const result = await client.query(
      'SELECT COUNT(*) FROM registeredstudentsforgym WHERE rollnumber = $1',
      [rollNumber]
    );

    client.release();

    // Check if any rows were found with the given roll number
    const count = parseInt(result.rows[0].count);
    if (count > 0) {
      res.status(200).json({ exists: true, message: 'You have already booked for Gym' });
    } else {
      res.status(200).json({ exists: false, message: 'You can proceed with gym registration' });
    }
  } catch (error) {
    console.error('Error checking gym registration:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/getAllotmentDetails/:rollNumber', async (req, res) => {
  const { rollNumber } = req.params;
  console.log('Fetching allotment details for roll number:', rollNumber);

  try {
    const client = await pool.connect();

    // Query to fetch room category and room number based on roll number from bookedstudents table
    const allotmentQuery = `
      SELECT roomcategory, roomnumber 
      FROM bookedstudents 
      WHERE rollnumber = $1
    `;
    const allotmentResult = await client.query(allotmentQuery, [rollNumber]);
    console.log(allotmentResult)
    if (allotmentResult.rows.length > 0) {
      const { roomcategory, roomnumber } = allotmentResult.rows[0];
      let tableName;
      if (roomcategory === 'shared') {
        tableName = 'sharedrooms';
      } else if (roomcategory === 'double') {
        tableName = 'twoseaterroom';
      } else if (roomcategory === 'single') {
        tableName = 'singleseater';
      }
      // Query to fetch room details based on room category and room number from corresponding table
      const roomDetailsQuery = `
        SELECT * 
        FROM ${tableName} 
        WHERE id = $1
      `;
      const roomDetailsResult = await client.query(roomDetailsQuery, [roomnumber]);

      if (roomDetailsResult.rows.length > 0) {
        const roomDetails = roomDetailsResult.rows[0];
        res.status(200).json(roomDetails);
      } else {
        res.status(404).json({ message: 'Room details not found' });
      }
    } else {
      res.status(404).json({ message: 'Allotment details not found' });
    }

    client.release();
  } catch (error) {
    console.error('Error fetching allotment details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
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



// API endpoint to book meals
app.post('/api/book-meal', async (req, res) => {
  const { rollNumber, day, breakfast, lunch, dinner } = req.body;
  console.log("Enter in API");

  try {
    // Check if a booking exists for the given roll number and day
    const existingBooking = await pool.query(
      'SELECT * FROM booked_meal WHERE rollnumber = $1 AND BookingDay = $2',
      [rollNumber, day]
    );

    if (existingBooking.rows.length > 0) {
      // If a booking exists, update the existing row
      let updatedMeals = {};
      if (typeof breakfast !== 'undefined') updatedMeals.breakfast = breakfast;
      if (typeof lunch !== 'undefined') updatedMeals.lunch = lunch;
      if (typeof dinner !== 'undefined') updatedMeals.dinner = dinner;

      const updateResult = await pool.query(
        'UPDATE booked_meal SET breakfast = COALESCE($1, breakfast), lunch = COALESCE($2, lunch), dinner = COALESCE($3, dinner) WHERE rollnumber = $4 AND BookingDay = $5',
        [breakfast, lunch, dinner, rollNumber, day]
      );

      // Send a success response
      res.json({ success: true, message: 'Meal updated successfully' });
    } else {
      // If no booking exists, insert a new row for the booking
      const insertResult = await pool.query(
        'INSERT INTO booked_meal (rollnumber, BookingDay, breakfast, lunch, dinner) VALUES ($1, $2, $3, $4, $5)',
        [rollNumber, day, breakfast, lunch, dinner]
      );

      // Send a success response
      res.json({ success: true, message: 'Meal booked successfully' });
    }
  } catch (error) {
    console.error('Error booking meal:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Endpoint to fetch booked days
app.get('/booked-days/:rollnumber', async (req, res) => {
  const { rollnumber } = req.params;

  try {
    // Fetch booked days data for the specific rollnumber from the database
    const result = await pool.query('SELECT DISTINCT bookingday FROM booked_meal WHERE rollnumber = $1', [rollnumber]);
    const bookedDays = result.rows.map(row => row.bookingday);
    console.log(bookedDays);
    res.json(bookedDays);
  } catch (error) {
    console.error('Error fetching booked days:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to unbook a meal
app.delete('/api/unbook-meal/:rollNumber/:day', async (req, res) => {
  console.log('Entered for unbook');
  const { rollNumber, day } = req.params;
  console.log("Unbooking meal for roll number:", rollNumber, "on day:", day);
  try {
    // Execute SQL query to delete the booked meal from the database
    const result = await pool.query(
      'DELETE FROM booked_meal WHERE rollnumber = $1 AND BookingDay = $2',
      [rollNumber, day]
    );

    // Check if any rows were affected by the delete operation
    if (result.rowCount > 0) {
      // Send a success response
      res.json({ success: true, message: 'Meal unbooked successfully' });
    } else {
      // If no rows were affected, the meal was not booked for the specified roll number and day
      res.status(404).json({ success: false, message: 'No booking found for the provided roll number and day' });
    }
  } catch (error) {
    console.error('Error unbooking meal:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



// API endpoint to check booked meals for a specific day and roll number
app.get('/api/check-booked-meals/:rollNumber/:day', async (req, res) => {
  const { rollNumber, day } = req.params;
  console.log('Checking the true value');
  console.log('Roll number: ', rollNumber);
  console.log('Booking Day: ', day);
  try {
    // Execute SQL query to check if the specified day and roll number exist in booked_meal table
    const result = await pool.query(
      'SELECT ' +
        'CASE WHEN breakfast THEN \'true\' ELSE NULL END AS breakfast, ' +
        'CASE WHEN lunch THEN \'true\' ELSE NULL END AS lunch, ' +
        'CASE WHEN dinner THEN \'true\' ELSE NULL END AS dinner ' +
      'FROM booked_meal ' +
      'WHERE rollnumber = $1 AND BookingDay = $2',
      [rollNumber, day]
    );

    // Check if any row is found
    if (result.rows.length > 0) {
      // If row found, send the meal selections as a JSON response
      const { breakfast, lunch, dinner } = result.rows[0];
      res.json({ success: true, bookedMeals: { breakfast, lunch, dinner } });
    } else {
      // If no row found, send an empty response
      res.json({ success: false, message: 'No booked meals found for the specified roll number and day' });
    }
  } catch (error) {
    console.error('Error checking booked meals:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

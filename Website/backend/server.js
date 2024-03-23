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
  host: '54.211.145.126',
  database: 'HostelEase',
  password: 'postgres',
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

// Add this route for authentication
app.post('/api/adminLogin', async (req, res) => {
  console.log("Server Side")
  try {
    const { username, password } = req.body;
    console.log(username)
    // Check the credentials against the adminLogin table in the database
    const result = await pool.query('SELECT * FROM adminLogin WHERE username = $1 AND password = $2', [
      username,
      password,
    ]);

    if (result.rows.length > 0) {
      // Authentication successful
      res.json({ message: 'Login successful' });
    } else {
      // Authentication failed
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define the API endpoint to fetch data
app.get('/api/roomAllocationApplications', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM roomAllocationApplications');
    const data = result.rows;
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add a new endpoint to delete a room allocation application
app.delete('/api/roomAllocationApplications/:roll_number', async (req, res) => {
  try {
    const rollNumberToDelete = req.params.roll_number;
    const { roomcategory, roomnumber } = req.body;

    // Perform the deletion in the database based on the provided roll_number, roomcategory, and roomnumber
    const result = await pool.query(
      'DELETE FROM roomAllocationApplications WHERE roll_number = $1 AND roomcategory = $2 AND roomnumber = $3 RETURNING *',
      [rollNumberToDelete, roomcategory, roomnumber]
    );

    if (result.rows.length === 0) {
      // No record found with the specified criteria
      res.status(404).json({ error: 'Record not found or already deleted' });
    } else {
      // Record successfully deleted
      res.json({ message: 'Record deleted successfully', deletedRecord: result.rows[0] });
    }
  } catch (error) {
    console.error('Error deleting room allocation record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// app.get('/api/searchRoomAllocation', async (req, res) => {
//   console.log('Searching')
//   try {
//     const { roomcategory, roomnumber } = req.query;
//     //console.log(roomcategory)
//     //console.log(roomnumber)
//     // Determine the table based on room category
//     let tableName;
//     if (roomcategory === 'shared') {
//       tableName = 'sharedrooms';
//     } else if (roomcategory === 'double') {
//       tableName = 'twoseaterroom';
//     } else if (roomcategory === 'single') {
//       tableName = 'singleseater';
//     } else {
//       return res.status(400).json({ error: 'Invalid room category' });
//     }
//     // Fetch the row from the respective table
//     const result = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [roomnumber]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'No record found' });
//     }
//     console.log(result)
//     // Convert the first "Applied" value into roll number
//     let rollNumber;
//     if (roomcategory === 'Shared') {
//       rollNumber = result.rows[0].member1;
//     } else if (roomcategory === 'Double') {
//       rollNumber = result.rows[0].member1;
//     } else if (roomcategory === 'Single') {
//       rollNumber = result.rows[0].member1;
//     }

//     res.json({ rollNumber });
//   } catch (error) {
//     console.error('Error searching room allocation:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


app.get('/api/searchRoomAllocation', async (req, res) => {
  console.log('Searching');
  try {
    const { roomcategory, roomnumber, rollnumber } = req.query;
    let tableName;

    // Determine the table based on room category
    if (roomcategory.toLowerCase() === 'shared') {
      tableName = 'sharedrooms';
    } else if (roomcategory.toLowerCase() === 'double') {
      tableName = 'twoseaterroom';
    } else if (roomcategory.toLowerCase() === 'single') {
      tableName = 'singleseater';
    } else {
      return res.status(400).json({ error: 'Invalid room category' });
    }

    // Fetch the row from the respective table
    const result = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [roomnumber]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No record found' });
    }

   // Convert the first "Applied" value into roll number
let rollNumber = rollnumber;
const members = result.rows[0];

for (const memberKey in members) {
  if (members[memberKey] === 'Applied' && memberKey.startsWith('member')) {
    console.log('Came to change roll number');

    // Ensure rollNumber is a string
    rollNumber = String(rollNumber); // Explicitly convert to string
    console.log(rollNumber)
   // Update the database with the correct roll number
   const updateResult = await pool.query(
    `UPDATE ${tableName} SET ${memberKey} = $1 WHERE id = $2`, // Remove RETURNING *
    [rollNumber, roomnumber]
  );
  console.log(memberKey)
  console.log('Database updated:', updateResult);

  // Logging the updated row requires a separate query:
  const updatedRow = await pool.query(
    `SELECT * FROM ${tableName} WHERE id = $1`,
    [roomnumber]
  );
  console.log('Updated Row:', updatedRow.rows[0])
// Insert the rollNumber into the BookedStudents table
const insertResult = await pool.query(
  'INSERT INTO bookedstudents (rollNumber, roomcategory, roomnumber) VALUES ($1, $2, $3)',
  [rollNumber, roomcategory, roomnumber]
);
console.log('RollNumber inserted into BookedStudents table:', insertResult);

    break; // Stop as soon as the first "Applied" value is found
  }
}

    res.json({ rollNumber });
  } catch (error) {
    console.error('Error searching room allocation:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/gymregistrationapplications', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT email, rollnumber, batch FROM gymregistrationapplications');
    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error('Error fetching gym registration data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/registerstudentforgym', async (req, res) => {
  const { rollnumber, email, batch } = req.body;
  console.log(rollnumber)
  console.log(email)
  console.log(batch)
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO registeredstudentsforgym ("rollnumber", "email", "batch") VALUES ($1, $2, $3)',
      [rollnumber, email, batch]
    );
    res.json({ success: true, message: 'Student registered for gym successfully' });
    client.release();
  } catch (error) {
    console.error('Error registering student for gym:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// DELETE route to delete an approved student from gymregistrationapplications table
app.delete('/api/gymregistrationapplications/:rollnumber', async (req, res) => {
  const { rollnumber } = req.params;
  try {
    // Execute SQL DELETE query to remove the student with the specified roll number
    const result = await pool.query('DELETE FROM gymregistrationapplications WHERE rollnumber = $1', [rollnumber]);
    res.json({ success: true, message: 'Student deleted successfully from gym registration applications.' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ success: false, message: 'An error occurred while deleting the student.' });
  }
});




app.get('/api/complaints', async (req, res) => {
  console.log("entered")
  try {
    const result = await pool.query('SELECT roll_no, title, description, category, created_at, status FROM complaints');
    res.json(result.rows);
    console.log(result);
  } catch (error) {
    console.error('Error retrieving complaints:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/api/Updatecomplaints/status', async (req, res) => {
  const { status, roll_no, title, description, category } = req.body;
  console.log("Updating")
  try {
    await pool.query(
      'UPDATE complaints SET status = $1 WHERE roll_no = $2 AND title = $3 AND description = $4 AND category = $5',
      [status, roll_no, title, description, category]
    );
    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/Deletecomplaints', async (req, res) => {
  const { roll_no, title, description, category } = req.body;

  try {
    await pool.query('DELETE FROM complaints WHERE roll_no = $1 AND title = $2 AND description = $3 AND category = $4', [roll_no, title, description, category]);
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// API endpoint to fetch all data from the meal table
app.get('/api/meals', async (req, res) => {
  console.log("enter in meal api");
  try {
    // Execute SQL query to select all data from the meal table
    const result = await pool.query('SELECT * FROM meal');
    
    // Send the selected data as a JSON response
    res.json({ success: true, meals: result.rows });
    //console.log(res);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Update meal endpoint
app.put('/api/meals/:days', async (req, res) => {
  try {
    const { days } = req.params;
    const { breakfast, lunch, dinner } = req.body;

    // Construct SQL query to update meal fields
    const query = {
      text: 'UPDATE meal SET breakfast = $1, lunch = $2, dinner = $3 WHERE days = $4',
      values: [breakfast, lunch, dinner, days],
    };

    // Execute the query
    const result = await pool.query(query);

    // Send success response
    res.json({ success: true, message: 'Meal updated successfully' });
  } catch (error) {
    console.error('Error updating meal:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

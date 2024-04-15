const express = require('express');

const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

console.log('JWT Secret:', process.env.ACCESS_TOKEN_SECRET); // Debugging output to verify environment variables


const app = express();


const allowedOrigins = 'http://localhost:3000';
//const allowedOrigins = ['http://localhost:3000', 'https://talentrail.me'];
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin, like mobile apps or curl
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200 // Some legacy browsers choke on status 204
};

app.use(cors(corsOptions));

app.use(express.json());
// Set up MySQL connection
const mysql = require('mysql2'); // Update require to mysql2

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'talentrails'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});
  
  // Registration endpoint
app.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  
  // First, check if the email is already used
  db.query('SELECT * FROM users WHERE Email = ?', [email], async (error, results) => {
    if (error) {
      res.status(500).send('Server error');
      return; // Stop further execution in case of error
    }
    if (results.length > 0) {
      res.status(400).send('Email already used');
      return; // Stop further execution if email is already used
    }
    
    // Proceed with user registration because email is not used
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Insert user into database since email is unique
      const query = 'INSERT INTO users (FirstName, LastName, Username, Email, PasswordHash) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [firstName, lastName, username, email, hashedPassword], (insertError, results) => {
        if (insertError) {
          res.status(500).send('Server error during user registration');
        } else {
          res.status(201).send('User registered successfully');
        }
      });
    } catch (hashError) {
      console.error('Error occurred:', hashError);
      res.status(500).send('Server error: ' + hashError.message);
    }
  });
});


// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password must be provided.' });
  }

  try {
    const [results] = await db.promise().query('SELECT * FROM users WHERE Username = ?', [username]);
    if (results.length === 0) {
      return res.status(401).send({ message: 'Invalid username or password.' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.PasswordHash);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid username or password.' });
    }

    const accessToken = jwt.sign({ userId: user.UserID, username: user.Username }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ message: 'Login successful', userName: user.Username, userId: user.UserID, accessToken });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'Server error during user authentication' });
  }
});



  

// Fetching user endpoint
  app.get('/users', (req, res) => {
    // Add authentication and authorization checks as necessary
    db.query('SELECT * FROM users', (error, results) => {
      if (error) {
        res.status(500).send('Server error');
      } else {
        res.json(results);
      }
    });
  });

  // Endpoint to get levels of education
app.get('/levelsofeducation', (req, res) => {
  db.query('SELECT * FROM levelsofeducation', (error, results) => {
    if (error) {
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Endpoint to get fields of study
app.get('/fieldsofstudy', (req, res) => {
  db.query('SELECT * FROM fieldsofstudy', (error, results) => {
    if (error) {
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Endpoint to get schools
app.get('/schools', (req, res) => {
  db.query('SELECT * FROM schools', (error, results) => {
    if (error) {
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Endpoint to get skills
app.get('/skills', (req, res) => {
  db.query('SELECT * FROM skills', (error, results) => {
    if (error) {
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Endpoint to get careers
app.get('/careers', (req, res) => {
  db.query('SELECT * FROM careers', (error, results) => {
    if (error) {
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

  // Endpoint for submitting survey responses
  app.post('/submit-survey', async (req, res) => {
    const { userId, educationLevelId, fieldOfStudyId, skills, desiredCareerId, industryId, schoolId } = req.body;
  
    // Ensure that the userId is not null and is a valid number
    if (!userId || isNaN(userId)) {
      return res.status(400).send('Invalid user ID.');
    }
  
    // Query to insert survey response
    const query = `
      INSERT INTO surveyresponses (
        userId, educationLevelId, fieldOfStudyId, skillsId, desiredCareerId, industryId, schoolId
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
    // The array must contain all the values for placeholders in the query
    const values = [
      userId,
      educationLevelId,
      fieldOfStudyId,
      JSON.stringify(skills),
      desiredCareerId,
      industryId,
      schoolId
    ];
  
    db.query(query, values, (error, results) => {
      if (error) {
        console.error('Failed to insert survey response:', error);
        res.status(500).send('Failed to submit survey. Error: ' + error.sqlMessage);
      } else {
        res.status(200).send('Survey submitted successfully.');
       
    }
  });
});

// Endpoint to get all published courses
app.get('/courses', (req, res) => {
  console.log("Fetching courses");
  db.query('SELECT * FROM courses WHERE IsPublished = "Yes"', (error, results) => {
    if (error) {
      console.error('Error fetching courses:', error);
      res.status(500).send('Server error: ' + error.message);
    } else {
      console.log("Courses fetched successfully");
      res.json(results);
    }
  });
});

// Endpoint to handle enrollment
app.post('/enroll', (req, res) => {
  const { userId, courseId } = req.body;
  const enrollmentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format as YYYY-MM-DD HH:MM:SS

  const sql = 'INSERT INTO enrollments (UserID, CourseID, EnrollmentDate) VALUES (?, ?, ?)';
  db.query(sql, [userId, courseId, enrollmentDate], (error, results) => {
      if (error) {
          console.error('Failed to enroll user:', error);
          res.status(500).send('Failed to enroll in course. Error: ' + error.message);
      } else {
          res.status(200).send({ message: 'Enrollment successful', enrollmentId: results.insertId });
      }
  });
});

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized if there's no token
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    req.user = user; // Attach the user payload to the request object
    next();
  });
};

// End point for counting enrollments

app.get('/enrollments/count', authenticateToken, (req, res) => {
  const userId = req.user.userId;  // Assuming userId is part of the JWT payload

  const sql = 'SELECT COUNT(*) AS count FROM enrollments WHERE UserID = ?';
  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Failed to fetch enrollments:', error);
      res.status(500).send('Failed to fetch enrollments. Error: ' + error.message);
    } else {
      res.status(200).json({ enrolledCoursesCount: results[0].count });
    }
  });
});


  
  

  // Fetch chats (simplified version: fetches all users for demo)
  app.get('/chats', (req, res) => {
    db.query('SELECT * FROM users', (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
  

// Fetch messages for a chat
app.get('/messages/:sender_id/:receiver_id', (req, res) => {
  const { sender_id, receiver_id } = req.params;
  const sql = `
    SELECT * FROM messages
    WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
    ORDER BY timestamp ASC;
  `;
  db.query(sql, [sender_id, receiver_id, receiver_id, sender_id], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});



// Post a new message
app.post('/message', (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  // Validate input
  if (!sender_id || !receiver_id || !message) {
    return res.status(400).json({ error: "sender_id, receiver_id and message are required" });
  }

  const sqlInsert = 'INSERT INTO messages (sender_id, receiver_id, message, timestamp) VALUES (?, ?, ?, NOW())';
  db.query(sqlInsert, [sender_id, receiver_id, message], (error, insertResults) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Now fetch the newly inserted message
    const sqlSelect = 'SELECT id, sender_id, receiver_id, message, timestamp FROM messages WHERE id = LAST_INSERT_ID()';
    db.query(sqlSelect, (selectError, selectResults) => {
      if (selectError) {
        console.error(selectError);
        return res.status(500).json({ error: 'Internal server error while fetching new message' });
      }
      if (selectResults.length > 0) {
        res.json({
          message: 'Message sent successfully.',
          data: selectResults[0] // Sending back the first row (should only be one)
        });
      } else {
        res.status(404).json({ error: 'Message created but not found' });
      }
    });
  });
});


  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



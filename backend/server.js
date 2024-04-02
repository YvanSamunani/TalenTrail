const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();


const corsOptions = {
  origin: 'http://localhost:3000', // or your frontend's origin
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'talentrails'
  });
  
  // Connect to MySQL
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
  
    // Check if both username and password are provided as strings
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).send('Username and password must be strings.');
    }
    
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

// Query database for user by username
db.query('SELECT * FROM users WHERE Username = ?', [username], async (error, results) => {
    if (error) {
      return res.status(500).send('Server error');
    }
  
    if (results.length === 0) {
      return res.status(401).send('User not found');
    }
  
    const user = results[0];
  
    // Use bcrypt to compare submitted password with stored hash
    bcrypt.compare(password, user.PasswordHash, function(err, isMatch) {
      if (err) {
          // handle error
          res.status(500).send('Server error while comparing passwords');
      } else if (isMatch) {
          // login user
          res.json({ message: 'Login successful', userName: user.FirstName });
          
      } else {
          // password does not match
          res.status(401).send('Password is incorrect');
      }
    });
  });
  
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



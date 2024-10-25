const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios'); // Add axios to your project
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Replace with your MySQL username
    password: 'Nayantra1234@',  // Replace with your MySQL password
    database: 'autopath'  // Replace with your MySQL database name
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Main route - Redirect to Signup Page
app.get('/', (req, res) => {
    res.redirect('/signup');
});

// Render Signup Page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Signup Route
app.post('/signup', (req, res) => {
    const { email, password, userType } = req.body;

    // Check if user already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            return res.json({ message: 'User already exists' });
        }

        // Insert new user
        db.query('INSERT INTO users (email, password, user_type) VALUES (?, ?, ?)', [email, password, userType], (err) => {
            if (err) throw err;
            res.redirect('/login');
        });
    });
});

// Render Login Page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if user exists and validate password
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) throw err;

        if (results.length > 0 && results[0].password === password) {
            const userType = results[0].user_type; // Assuming the user_type column stores 'authority' or 'citizen'

            // Redirect based on user type
            if (userType === 'authority') {
                return res.redirect('/admin');  // Redirect to admin page (admwp.html)
            } else if (userType === 'citizen') {
                return res.redirect('/welcomepage');  // Redirect to citizen page (welcomepage.html)
            }
        } else {
            return res.json({ message: 'Invalid credentials' });
        }
    });
});

// Render Admin Page (for authority users)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admwp.html')); // Admin (authority) page
});

// Render Citizen Welcome Page (for citizen users)
app.get('/welcomepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcomepage.html')); // Citizen page
});


// Render Welcome Page
app.get('/welcomepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcomepage.html'));
});


// Add this route to get the What3words location based on user coordinates
app.get('/get-location', async (req, res) => {
    const { lat, lng } = req.query; // Get latitude and longitude from query parameters

    try {
        const apiKey = 'F7XIP1I5'; // Replace with your actual What3words API key
        const response = await axios.get(`https://api.what3words.com/v3/convert-to-3wa`, {
            params: {
                coordinates: `${lat},${lng}`,
                key: apiKey
            }
        });
        const threeWordAddress = response.data.words; // Extract the words from the response
        res.json({ success: true, address: threeWordAddress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error retrieving location' });
    }
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

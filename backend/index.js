// Import required libraries
require('dotenv').config(); // Loads variables from .env file
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // Import the mysql2 library
const path = require('path');
// Create an Express application
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// --- DATABASE CONNECTION ---
// Create a connection pool to the database
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();


// --- API ROUTES ---
// Create a new route to get all products
app.get('/api/products', async (req, res) => {
    try {
        // SQL query to select all records from the products table
        const [results] = await db.query('SELECT * FROM products');
        // Send the results back as a JSON response
        res.json(results);
    } catch (err) {
        // If there's an error, log it and send a 500 server error response
        console.error('Database query error:', err);
        res.status(500).json({ message: 'Error fetching products from database' });
    }
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
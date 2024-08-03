// Import express module
const express = require('express');
// Import body-parser module
const bodyParser = require('body-parser');

// Create an instance of an Express application
const app = express();
// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Initialize an empty timetable array
let timetable = [];

// Define a GET endpoint to retrieve timetable
app.get('/api/timetable', (req, res) => {
    // Send timetable array as a JSON response
    res.json(timetable);
});

// Define a POST endpoint to update timetable
app.post('/api/timetable', (req, res) => {
    // Update timetable with data from request body
    timetable = req.body;
    // Send a success message as a JSON response
    res.json({ message: 'Updated successfully!' });
});

// Set port from environment variables or default to 3000
const port = process.env.PORT || 3000;
// Start server and listen on specified port
app.listen(port, () => {
    // Log a message to indicate that server is running
    console.log(`Server running on port ${port}`);
});

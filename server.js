const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of an Express application
const app = express();
// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

let timetable = [];

// Define GET endpoint to retrieve timetable
app.get('/api/timetable', (req, res) => {
    // Send timetable array as JSON response
    res.json(timetable);
});

// Define a POST endpoint to update timetable
app.post('/api/timetable', (req, res) => {
    // Update timetable
    timetable = req.body;
    // Send a success message(JSON)
    res.json({ message: 'Updated successfully!' });
});

const port = process.env.PORT || 3000;
// Start server and listen on specified port
app.listen(port, () => {
    // Log a message to indicate that server is running
    console.log(`Server running on port ${port}`);
});

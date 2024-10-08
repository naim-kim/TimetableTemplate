const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let timetable = [];

// GET endpoint to retrieve timetable
app.get('/api/timetable', (req, res) => {
    res.json(timetable);
});

// POST endpoint to update timetable
app.post('/api/timetable', (req, res) => {
    timetable = req.body;
    res.json({ message: 'Updated successfully!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

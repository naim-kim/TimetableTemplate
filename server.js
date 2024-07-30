const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let timetable = [];

app.get('/api/timetable', (req, res) => {
    res.json(timetable);
});





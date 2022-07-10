const ytdl = require('ytdl-core');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));
app.use(express.json());

// Serve any static files
app.use(express.static(path.join(__dirname, 'Client/build')));
// Handle React routing, return all requests to React app
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'Client/build', 'index.html'));
});

app.use('/api', require('./routes/root'));

app.all('*', (req, res) => {
    res.json({ "error": "404 Not Found" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

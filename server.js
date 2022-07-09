const ytdl = require('ytdl-core');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', require('./routes/root'));

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.all('*', (req, res) => {
    res.json({ "error": "404 Not Found" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

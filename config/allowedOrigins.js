const allowedOrigins = [
    'http://localhost:3500',
    'http://localhost:3000',
    'http://localhost:' + process.env.PORT,
    'https://evgene-youtube-downloader-1.herokuapp.com/',
];

module.exports = allowedOrigins;
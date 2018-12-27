const express = require('express'),
    app = express(),
    path = require('path'),
    config = require('./config.json');

app.get('/index.css', (req, res) => {
    res.sendFile(path.join(__dirname, "index.css"));
});
app.get('/visualize.js', (req, res) => {
    res.sendFile(path.join(__dirname, "visualize.js"));
});

app.use("/themes", express.static(path.join(__dirname, "themes/")));
app.use("/algos", express.static(path.join(__dirname, "algos/")));

app.get('/:theme', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(config.port, () => console.log(` [WEBSERVER]: Listening on :${config.port} ... `));
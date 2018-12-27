const express = require('express'), 
        app = express(),
        config = require('./config.json');

app.get('/:theme', (req, res) => {
    switch (req.params.theme) {
        case 'dark':

            break;
        default:
            
            break;
    }
});

app.listen(config.port, () => console.log(` [WEBSERVER]: Listening on :${config.port} ... `));
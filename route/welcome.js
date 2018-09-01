'use strict';

const path = require('path');

module.exports = app => {

    app.get('/', (req, res) => {
        const filepath = path.join(__dirname + '/../views/welcome.html');

        return res.sendFile(filepath);
    });

};
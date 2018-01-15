var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    db = require('./dbConnection'),
    User = require('./api/models/user'),
    bodyPerser = require('body-parser');

app.listen(port);

console.log('MyCare RESTful API server started on: ' + port);

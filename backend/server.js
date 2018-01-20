/*
 * Server.js
 *
 * starts express server
 */
var express = require('express'),
    app = express(),
    router = express.Router(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    db = require('./dbConnection'),
    User = require('./api/models/userModel'),
    Profile = require('./api/models/profileModel'),
	/* My Entires */
	EOB = require('./api/models/EOBModel'),
	EOBType = require('./api/models/EOBTypeModel'),
	entry = require('./api/models/EntryModel'),
	billable = require('./api/models/BillableModel'),
	
	
    userRoute = require('./api/routes/userRoute'),
    bbRoute = require('./api/routes/blueButtonRoute'),
    bodyParser = require('body-parser'),
    jsonwebtoken = require('jsonwebtoken');

//----------------------
// App Config

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// check auth header and decode if exist
app.use(function(req,res,next){
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err,decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    })
  } else {
    req.user = undefined;
    next();
  }
})

//----------------------
// final steps

// init routes
userRoute(router);
bbRoute(router);

// root
app.use('/', express.static('public'));

// base 
app.use('/api/v1',router);

// start server
app.listen(port);

console.log('MyCare RESTful API server started on: ' + port);

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
    ICD = require('./api/models/ICDModel'),
    NPI = require('./api/models/NPIModel'),
    Profile = require('./api/models/profileModel'),
    EOB = require('./api/models/EOBModel'),
    EOBStatus = require('./api/models/EOBStatusModel'),
    Payer = require('./api/models/PayerModel'),
    entry = require('./api/models/entryModel'),
    billable = require('./api/models/billableDateModel'),
    provider = require('./api/models/providerModel'),
    HIT = require('./api/models/HITModel'),
    providerToken = require('./api/models/providerTokenModel'),
    diagonosis = require('./api/models/diagnosisModel'),    	
    userRoute = require('./api/routes/userRoute'),
    bbRoute = require('./api/routes/blueButtonRoute'),
    npiRoute = require('./api/routes/NPIRoute'),
    commonRoute = require('./api/routes/commonRoute'),    
    bodyParser = require('body-parser'),
    jsonwebtoken = require('jsonwebtoken');

// required to remove deprecation warning
mongoose.Promise = global.Promise;

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
npiRoute(router);
commonRoute(router);

// root
app.use('/', express.static('public'));

// base 
app.use('/api/v1',router);

// start server
app.listen(port);

console.log('MyCare RESTful API server started on: ' + port);

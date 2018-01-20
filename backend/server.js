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
    Profile = require('./api/models/profileModel'),
	/* My Entires */
	EOB = require('./api/models/EOBModel'),
	EOBType = require('./api/models/EOBTypeModel'),
	entry = require('./api/models/EntryModel'),
	billable = require('./api/models/BillableModel'),
	diagnosis = require('./api/models/diagnosisModel'),
	
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

// npm run start -- --meta LOAD
// load meta data
var argv = require('minimist')(process.argv.slice(2));
console.log(argv);
if (argv.meta == 'LOAD') {

  console.log('Loading meta');
  
  var csv = require("fast-csv");
  var ICD = mongoose.model('ICD');


  console.log("Saving ICD codes...");
  
  // load icd
  csv.fromPath("./public/icd10cm_codes_2018.csv", { headers : true }
  ).on("data", function(data){
    
    // save
    (new ICD({ code:data.CODE, desc:data.DESC })).save();
    
  }).on("end", function(){
    console.log("ICD codes saved.");
  });


  // load npi
  csv.fromPath("./public/npidata_20180108-20180114.csv", { headers : true }
  ).on("data", function(data){
    
    // save
    (new ICD({ code:data.CODE, desc:data.DESC })).save();
    
  }).on("end", function(){
    console.log("ICD codes saved.");
  });

}

// start server
app.listen(port);

console.log('MyCare RESTful API server started on: ' + port);

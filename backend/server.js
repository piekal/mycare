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
    EOBType = require('./api/models/EOBTypeModel'),
    entry = require('./api/models/entryModel'),
    billable = require('./api/models/billableDateModel'),
    provider = require('./api/models/providerModel'),
    diagonosis = require('./api/models/diagnosisModel'),    	
    userRoute = require('./api/routes/userRoute'),
    bbRoute = require('./api/routes/blueButtonRoute'),
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
  var NPI = mongoose.model('NPI');


  console.log("Saving ICD codes...");
  
  // load icd
  csv.fromPath("./public/icd10cm_codes_2018.csv", { headers : true }
  ).on("data", function(data){
    
    // save
    (new ICD({ code:data.CODE, desc:data.DESC })).save();
    
  }).on("end", function(){
    console.log("ICD codes saved.");
  });

  console.log("Saving NPI codes...");

  // load npi
  csv.fromPath("./public/npidata_20180108-20180114.csv", { headers : true }
  ).on("data", function(data){
    
    // save
    (new NPI({
      npi_code:data["NPI"],
      type:data["Entity Type Code"],
      org_name:data["Provider Organization Name (Legal Business Name)"].trim(),
      provider_name_prefix:data["Provider Name Prefix Text"].trim(),
      provider_first_name:data["Provider First Name"].trim(),
      provider_middle_name:data["Provider Middle Name"].trim(),
      provider_last_name:data["Provider Last Name (Legal Name)"].trim(),
      provider_name_suffix:data["Provider Name Suffix Text"].trim()
    })).save();
    
  }).on("end", function(){
    console.log("NPI codes saved.");
  });

}

// start server
app.listen(port);

console.log('MyCare RESTful API server started on: ' + port);

'use strict';

var mongoose = require('mongoose');
var axios = require('axios');
var fs = require('fs');
var ProviderToken = mongoose.model('ProviderToken');
var Payer = mongoose.model('Payer');
var EOB = mongoose.model('EOB');
var User = mongoose.model('User');
var Profile = mongoose.model('Profile');
var EOBStatus = mongoose.model('EOBStatus');
var Entry = mongoose.model('Entry');
var Billable = mongoose.model('Billable');
var Provider = mongoose.model('Provider');
var Diagnosis = mongoose.model('Diagnosis');
var ICD = mongoose.model('ICD');
var NPI = mongoose.model('NPI');
var _ = require('lodash');
var uuid = require('uuid');
var EOBHelper = require('../helpers/EOBHelper');
var PayerConstants = require('../constants/PayerConstants');
var eobStatusConstants = require('../constants/EOBStatusConstants');
var csv = require("fast-csv");
var ICD = mongoose.model('ICD');
var TokenType = mongoose.model('TokenType');
var UserToken = mongoose.model('UserToken');
var NPI = mongoose.model('NPI');
var HIT = mongoose.model('HIT');
var Payer = mongoose.model('Payer');



/*
 * Check token
 */
exports.loginRequired = function(req, res, next){
  console.log('Check auth token');
  
  User.findOne({
    _id:req.user
  }).then(function(user) {

    console.error(user);
    
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized user!' });
    } else {
      next();
    }
  });
}

exports.purge_data = function(req, res, next) {
  
  NPI.remove({}).exec();
  ICD.remove({}).exec();
  Payer.remove({}).exec();
  HIT.remove({}).exec();

  Billable.remove({}).exec();
  Diagnosis.remove({}).exec();
  Provider.remove({}).exec();
  Entry.remove({}).exec();
  EOB.remove({}).exec();
  EOBStatus.remove({}).exec();
  ProviderToken.remove({}).exec();
  TokenType.remove({}).exec();
  UserToken.remove({}).exec();
  User.remove({}).exec();
  Profile.remove({}).exec();  
  
  return res.status(200).send("Purge complete");      
}

exports.load_metadata = function(req, res, next){

  console.log('Loading meta');  

  console.log("Saving ICD codes...");

  //------------------------------
  // Begin load metadata
  
  // add payer type
  (new Payer({
    name:'CMS_BLUE_BUTTON',
    desc:'CMS_BLUE_BUTTON'
  })).save();

  // add token type
  (new TokenType({
    name:'PAYER',
    desc:'Token for Payer'
  })).save();

  (new TokenType({
    name:'PROVIDER',
    desc:'Token for Provider'
  })).save();

  
  // add HIT
  console.log("Saving NPI codes...");
  // add Care evolution
  (new HIT({
    name:'CareEvolution',
    api_endpoint: 'https://fhir.careevolution.com/Master.Adapter1.WebClient/api/fhir',
    token_endpoint: 'https://fhir.careevolution.com/Master.Adapter1.WebClient/api/OAuth2/Token',
    oauth_url: 'https://fhir.careevolution.com/Master.Adapter1.WebClient/OAuth2/Authorize?response_type=code&client_id=adc97029-f891-4931-ad16-2a311c76076d&redirect_uri=mycare://careevolution/callback&scope=patient/*.read&state=s06Up0SpUg&aud=https://fhir.careevolution.com/Master.Adapter1.WebClient/api/fhir'
    
  })).save(function(err, hit) {

    // load npi
    csv.fromPath("./public/npidata_20180108-20180114.csv", { headers : true }
    ).on("data", function(data){

      if (data["Provider Organization Name (Legal Business Name)"].trim().length > 0 || data["Provider First Name"].trim().length > 0) {
      
	// save
	var newNPI = new NPI({
          npi_code:data["NPI"],
          type:data["Entity Type Code"],
          org_name:data["Provider Organization Name (Legal Business Name)"].trim(),
          provider_name_prefix:data["Provider Name Prefix Text"].trim(),
          provider_first_name:data["Provider First Name"].trim(),
          provider_middle_name:data["Provider Middle Name"].trim(),
          provider_last_name:data["Provider Last Name (Legal Name)"].trim(),
          provider_name_suffix:data["Provider Name Suffix Text"].trim()
	});
      
      
	// add randm hit
	HIT.count().exec(function (err, count) {
          var random = Math.floor(Math.random() * count);
          HIT.findOne().skip(random).exec(
	    function (err, result) {
              newNPI.hit = result;
              newNPI.save();
	    });	
	});
      }
    }).on("end", function(){
      console.log("NPI csv saved.");
    });
    
  });
  
  // load icd
  csv.fromPath("./public/icd10cm_codes_2018.csv", { headers : true }
  ).on("data", function(data){
    
    // save
    (new ICD({ code:data.CODE, desc:data.DESC })).save();
    
  }).on("end", function(){
    console.log("ICD codes saved.");
  });
  return res.status(200).send("Load complete");      
}


'use strict';

var mongoose = require('mongoose');
var axios = require('axios');
var fs = require('fs');
var providerToken = mongoose.model('ProviderToken');
var Payer = mongoose.model('Payer');
var EOB = mongoose.model('EOB');
var EOBStatus = mongoose.model('EOBStatus');
var entry = mongoose.model('Entry');
var billable = mongoose.model('Billable');
var provider = mongoose.model('Provider');
var diagnosis = mongoose.model('Diagnosis');
var ICD = mongoose.model('ICD');
var NPI = mongoose.model('NPI');
var _ = require('lodash');
var uuid = require('uuid');
var EOBHelper = require('../helpers/EOBHelper');
var payerConstants = require('../constants/PayerConstants');
var eobStatusConstants = require('../constants/EOBStatusConstants');
var csv = require("fast-csv");
var ICD = mongoose.model('ICD');
var NPI = mongoose.model('NPI');
var HIT = mongoose.model('HIT');
var Payer = mongoose.model('Payer');



/*
 * Check token
 */
exports.loginRequired = function(req, res, next){
  console.log('Check auth token');
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
}

exports.purge_metadata = function(req, res, next) {
  
  NPI.remove({}).exec();
  ICD.remove({}).exec();
  Payer.remove({}).exec();
  payer.remove({}).exec();
  HIT.remove({}).exec();
  return res.status(200).send("Purge complete");      

}

exports.load_metadata = function(req, res, next){

  console.log('Loading meta');  

  console.log("Saving ICD codes...");

  // 1. add payer type
  (new Payer({ name:'CMS_BLUE_BUTTON', desc:'CMS_BLUE_BUTTON' })).save();

  // 2. add HIT

  // add Care evolution
  (new HIT({
    name:'CareEvolution',
    api_endpoint: 'https://fhir.careevolution.com/Master.Adapter1.WebClient/api/fhir',
    token_endpoint: 'https://fhir.careevolution.com/Master.Adapter1.WebClient/api/OAuth2/Token'
  })).save(function(err, hit) {

    // 3.load npi
    csv.fromPath("./public/npidata_20180108-20180114.csv", { headers : true }
    ).on("data", function(data){

      console.log("Saving NPI codes...");
      
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
    }).on("end", function(){
      console.log("NPI csv saved.");
    });
    
  });
  
  // 4. load icd
  csv.fromPath("./public/icd10cm_codes_2018.csv", { headers : true }
  ).on("data", function(data){
    
    // save
    (new ICD({ code:data.CODE, desc:data.DESC })).save();
    
  }).on("end", function(){
    console.log("ICD codes saved.");
  });
  return res.status(200).send("Load complete");      
}


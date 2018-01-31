'use strict';

var mongoose = require('mongoose');
var axios = require('axios');
var fs = require('fs');
var ProviderToken = mongoose.model('ProviderToken');
var TokenType = mongoose.model('TokenType');
var UserToken = mongoose.model('UserToken');
var Payer = mongoose.model('Payer');
var EOB = mongoose.model('EOB');
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
var payerConstants = require('../constants/PayerConstants');
var eobStatusConstants = require('../constants/EOBStatusConstants');


exports.get_unique_provider = function(req, res) {
  console.log('GET /patient/provider : ',req.user);
  
  EOB.find({
    user_id:req.user
  }).populate('payer').then(function(eobs) {
    
    var providerList = [];
    
    // for each eob
    _.each(eobs, function(eob) {
            
      Entry.find({
	eob_id:eob
      }).then(function(entries){

	var promises = entries.map(function(entry) {
	  return new Promise(function(resolve, reject) {
	    var providerPromise = Provider.findOne({
	      entry_id:entry
	    }).populate({ 
              path: 'npi',
              populate: {
                path: 'hit',
                model: 'HIT'
              } 
            });
	    
	    providerPromise.then(function(provider) {
	      var ret = {};
	      if (provider) {
		var npi = provider.npi;
		var hit = provider.npi.hit;
		
		// set return
		ret.provider = npi.getProviderName();
		ret.npi_code = npi.npi_code;
		ret.payer = eob.payer.name;
		ret.oauth_url = hit.oauth_url;
		ret.hit = hit.name;

		// if same record not found in list
		if (!_.some(providerList, ret)) {
		  providerList.push(ret);
		}
	      }
	    });

	    Promise.all([
              providerPromise,
            ]).then(function() {
              resolve();
            });	    
	  })
	});

	// when all promises are resolved
        Promise.all(promises).then(function() {
          return res.status(200).send(providerList);
        });
      })  
    });
  });
}


exports.timeline = async function(req, res) {
  console.log('GET /payer/timeline : ',req.params);
  
  Payer.findOne({
    name: "CMS_BLUE_BUTTON"
  }).then(function(payer) {
    
    EOBStatus.findOne({
      user_id:req.user,
      payer:payer
    },function(err,obj) {

      // if EOB is ready
      if (obj.status.indexOf("READY") > -1) {
        var ret = [];

        // 1. start with eob
        EOB.findOne({
          payer:payer,
          user_id:req.user
        },function(err,eob) {
          //console.error(eob);

          // 2. get all entries
          Entry.find({
            eob_id:eob
          },function(err, entries) {
            //console.error(entries);

            var promises = entries.map(function(e) {
              
              return new Promise(function(resolve,reject) {
                // create new timeline
                var timeline = {};
                var hit_id;

                timeline.entry_id = e._id;               
                
                // add provider
                var providerPromise = Provider.findOne({
                  entry_id:e              
                }).populate({ 
                  path: 'npi',
                  populate: {
                    path: 'hit',
                    model: 'HIT'
                  } 
                }).exec(function(err,p){
                  if (p && p.npi) {
                    var n = p.npi;
		    timeline.provider = n.getProviderName();
                    timeline.HIT = n.hit.name;
                  }
                });
                
                // add first diagnosis
		var random =  Math.floor(Math.random() * 7) + 1;
                var diagnosisPromise = ICD.findOne({
                  code:new RegExp('Z.+' + random)
                }).exec(function(err,d) {
                  
                  if (d != null) {
                    timeline.first_icd_code = d.code;
                    timeline.first_icd_desc = d.desc;
                  }
                });
                
                // add date
                var billablePromise = Billable.findOne({
                  entry_id:e              
                }).exec(function(err,b){
                  if (b) {
                    timeline.start_date = b.start_date;
                    timeline.end_date = b.end_date;
                    ret.push(timeline);
                  }
                });                                
                
                // resolve all
                Promise.all([
                  billablePromise,
                  providerPromise,
                  diagnosisPromise
                ]).then(function() {
                  resolve();
                });
              });
            });

            // when all promises are resolved
            Promise.all(promises).then(function() {
              return res.status(200).send(ret);
            });
          })
        })          
      } else {
        return res.status(200).send("EOB NOT READY");
      }
    });
  });
}


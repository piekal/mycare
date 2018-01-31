'use strict';

var mongoose = require('mongoose');
var axios = require('axios');
var fs = require('fs');
var providerToken = mongoose.model('ProviderToken');
var TokenType = mongoose.model('TokenType');
var UserToken = mongoose.model('UserToken');
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


exports.get_payer = function(req,res) {
  Payer.find({
  }).then(function(payers) {
    return res.status(200).send(payers);
  });
}

/*
 * GET /payer/provider/callback
 *
 * handle provider callback
 */
exports.payer_callback = function(req, res) {
  console.log('GET /payer/:payer_id/code : ',req.params);
  /*
   * exchange token at /o/token
   */
  // TODO
  
  //-----------------------------------------------
  // assume token is found
  var payerToken = 'PETf15vD2vTvMj2c7lB2V0to3wAANG';
  //-----------------------------------------------

  // save token
  TokenType.findOne({
    name:payerConstants.PAYER_TYPE
  }).then(function(type) {
    UserToken.findOneAndUpdate({
      user:req.user,
      token_type: type
    },{
      token:payerToken
    },{
      upsert:true
    }).then(function(userToken){
    })
  });

    
  // get PAYER type 
  Payer.findOne({
    _id: req.params.payer_id
  }, function(err,payer) {
    
    if (err || !payer) {
      console.error('Payer not found : ',err);
      return res.status(500).send({
  	messege:"Payer not found"
      });
    };

    // upsert token
    providerToken.findOneAndUpdate({
      user_id:req.user,
      payer:payer      
    },{
      token:payerToken
    },{upsert:true, new:true }, function(err,t){
      if(t) {
  	console.log('PAYER Token Saved');
      }
    });

    // upsert status
    EOBStatus.findOneAndUpdate({
      user_id:req.user,
      payer:payer
    },{
      status:"LOADING_EOB"
    },{upsert:true, new:true }, function(err,st){
      console.log('Fetching EOB...');
      
      // call payer eob
      axios({
        method:'get',
        url:'https://sandbox.bluebutton.cms.gov/v1/fhir/ExplanationOfBenefit/',
        headers: {
          'Authorization': 'Bearer ' + payerToken
        },
        responseType:'json'
      }).then(function(resp) {
  	console.log('Parsing EOB...');
        EOBHelper.parseEOB(req,resp.data);
	return res.status(200).send("Fetching EOB Successful");
      },function(err) {
	console.error('Fetching EOB Failed!');
	return res.status(500).send("Fetching EOB Failed!");
      });
    });
  });
}

/*
 * send status
 */
exports.eob_status = function(req, res) {
  console.log('GET /payer/:payer_id/eob/status : ',req.params);

  Payer.findOne({
    _id: req.params.payer_id 
  }).then(function(payer) {
    console.log(payer);

    if (!payer) {
      return res.status(500).send("Payer Not Found");
    }
    EOBStatus.findOne({
      user_id:req.user,
      payer:payer
    }).then(function(eobstatus) {
      console.log(eobstatus);
      return res.status(200).send(eobstatus.status);
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
          entry.find({
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
                var providerPromise = provider.findOne({
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
                    if (n.type == 1) {
		      var prefix = n.provider_name_prefix.trim.length > 0 ?
			  n.provider_name_prefix.trim() + " " : "";
		      var suffix = n.provider_name_suffix.trim.length > 0 ?
			  " " +n.provider_name_suffix.trim() : "";		      
		      
		      timeline.provider =
			prefix +
			n.provider_first_name.trim() + " "+
			n.provider_last_name.trim() +
			suffix;
                    } else {
                      timeline.provider = n.org_name.trim();
                    }
                    timeline.HIT = n.hit.name;
                  }
                });
                
                // add first diagnosis
                var diagnosisPromise = ICD.findOne({
                  code:/Z.+/
                }).exec(function(err,d) {

                  console.error("Found D : ",d);
                  
                  if (d != null) {
                    timeline.first_icd_code = d.code;
                    timeline.first_icd_desc = d.desc;
                  }
                });
                
                // add date
                var billablePromise = billable.findOne({
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

exports.get_diagnosis = function(req, res) {
  console.error(req.params);  
  diagnosis.find({
    entry_id:req.params.entry_id
  }).populate('icd').exec(function(err, ds) {
    return res.json(ds);
  }); 
}

exports.purge_eob = function(req, res) {
  EOB.remove({}).exec();
  entry.remove({}).exec();
  billable.remove({}).exec();
  diagnosis.remove({}).exec();
  provider.remove({}).exec();
  return res.status(200).send("Purge complete");      
}


exports.observation = function(req, res) {
  return res.status(200).send("Observation endpoint");      
}


exports.get_unique_provider = function(req,res) {
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
          entry.find({
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
                var providerPromise = provider.findOne({
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
                    if (n.type == 1) {
		      var prefix = n.provider_name_prefix.trim.length > 0 ?
			  n.provider_name_prefix.trim() + " " : "";
		      var suffix = n.provider_name_suffix.trim.length > 0 ?
			  " " +n.provider_name_suffix.trim() : "";		      
		      
		      timeline.provider =
			prefix +
			n.provider_first_name.trim() + " "+
			n.provider_last_name.trim() +
			suffix;
                    } else {
                      timeline.provider = n.org_name.trim();
                    }
                    timeline.HIT = n.hit.name;
                  }
                });
                
                // add first diagnosis
                var diagnosisPromise = ICD.findOne({
                  code:/Z.+/
                }).exec(function(err,d) {

                  console.error("Found D : ",d);
                  
                  if (d != null) {
                    timeline.first_icd_code = d.code;
                    timeline.first_icd_desc = d.desc;
                  }
                });
                
                // add date
                var billablePromise = billable.findOne({
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

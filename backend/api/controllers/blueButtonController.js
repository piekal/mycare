'use strict';

var mongoose = require('mongoose');
var axios = require('axios');
var fs = require('fs');
var providerToken = mongoose.model('ProviderToken');
var EOBType = mongoose.model('EOBType');
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
var eobTypeConstants = require('../constants/EOBTypeConstants');
var eobStatusConstants = require('../constants/EOBStatusConstants');

/*
 * GET /bb/provider/callback
 *
 * handle provider callback
 */
exports.provider_callback = function(req, res) {
  console.log('GET /bb/provider/callback : ',req.params);

  /*
   * exchange token at /o/token
   */
  // TODO
  
  //-----------------------------------------------
  // assume token is found
  var bbToken = 'PETf15vD2vTvMj2c7lB2V0to3wAANG';
  //-----------------------------------------------
  
  // get BB type 
  EOBType.findOne({
    name: eobTypeConstants.CMS_BLUE_BUTTON
  }, function(err,eobtype) {
    
    if (err || !eobtype) {
      console.error('EOBType not found : ',err);
      return res.status(500).send({
	messege:err
      });
    };

    // upsert token
    providerToken.findOneAndUpdate({
      user_id:req.user,
      eob_type:eobtype      
    },{
      token:bbToken
    },{upsert:true, new:true }, function(err,t){
      if(t) {
	console.log('BB Token Saved');
      }
    });
    
    // upsert status
    EOBStatus.findOneAndUpdate({
      user_id:req.user,
      eob_type:eobtype
    },{
      status:"LOADING_EOB"
    },{upsert:true, new:true }, function(err,st){
      console.log('Fetching EOB...');
      res.status(200).send("Fetching EOB");

      // call bb eob
      axios({
        method:'get',
        url:'https://sandbox.bluebutton.cms.gov/v1/fhir/ExplanationOfBenefit/?patient=20140000008324',
        headers: {
          'Authorization': 'Bearer ' + bbToken
        },
        responseType:'json'
      }).then(function(resp) {
	console.log('Parsing EOB...');
        EOBHelper.parseEOB(req,resp.data);	
      });
    });
  });
}


/*
 * send status
 */
exports.status = function(req, res) {
  console.log('GET /bb/status : ',req.params);

  EOBType.findOne({
    name: "CMS_BLUE_BUTTON"
  }).then(function(eobtype) {
    
    EOBStatus.findOne({
      user_id:req.user,
      eob_type:eobtype
    },function(err,obj) {
      return res.status(200).send(obj.status);
    });
  });
}

exports.timeline = async function(req, res) {
  console.log('GET /bb/timeline : ',req.params);
  
  EOBType.findOne({
    name: "CMS_BLUE_BUTTON"
  }).then(function(eobtype) {
    
    EOBStatus.findOne({
      user_id:req.user,
      eob_type:eobtype
    },function(err,obj) {

      // if EOB is ready
      if (obj.status.indexOf("READY") > -1) {
        var ret = [];
        
        EOB.findOne({
          eob_type:eobtype,
          user_id:req.user
        },function(err,eob) {
          //console.error(eob);

          entry.find({
            eob_id:eob
          },function(err, entries) {
            //console.error(entries);

            var promises = entries.map(function(e) {
              
              return new Promise(function(resolve,reject) {
                // create new timeline
                var timeline = {};
                timeline.entry_id = e._id;
                
                // add provider
                var providerPromise = provider.findOne({
                  entry_id:e              
                }).populate('npi').exec(function(err,p){
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
                  }
                });
                
                // add first diagnosis
                var diagnosisPromise = diagnosis.findOne({
                  entry_id:e
                }).populate('icd').exec(function(err,d) {
                  if (d && d.icd && d.sequence == 1) {
                    timeline.first_icd_code = d.icd.code;
                    timeline.first_icd_desc = d.icd.desc;
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

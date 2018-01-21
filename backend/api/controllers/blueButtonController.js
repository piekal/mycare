'use strict';

var mongoose = require('mongoose');
var axios = require('axios');
var fs = require('fs');
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

/*
 * handle provider callback
 */
exports.provider_callback = function(req, res) {
  console.log('GET /bb/provider/callback : ',req.params);
  return res.status(200).send();
}


/*
 * handle provider callback
 */
exports.provider_callback = function(req, res) {
  console.log('GET /bb/provider/callback : ',req.params);

  // BB 
  EOBType.findOne({
    name: "CMS_BLUE_BUTTON"
  }).then(function(res) {
    // save status
    EOBStatus.findOneAndUpdate({
      user_id:req.user,
      eob_type:res
    },{
      status:"LOADING_EOB"
    },{upsert:true, new:true },function(){
      axios({
        method:'get',
        url:'https://sandbox.bluebutton.cms.gov/v1/fhir/ExplanationOfBenefit/?patient=20140000008324',
        headers: {
          'Authorization': 'Bearer PETf15vD2vTvMj2c7lB2V0to3wAANG'
        },
        responseType:'json'
      }).then(function(response) {
        //  var eobparse= JSON.parse(fs.readFileSync('../shared/SampleEOB.json'));
        var eobparse = response.data;
        parseEOB(req,eobparse);    
      });
    });
  });
  return res.status(200).send();
}

/*
 * Parse EOB
 */
function parseEOB(req,eobparse) {    
  
  console.log("Start Parse EOB");
  var eob = new EOB({ user_id:req.user, total: eobparse.total});
  
  // find eob type
  EOBType.findOne({
    name: "CMS_BLUE_BUTTON"
  }).then(function(res) {
    //console.log(res);
    eob.eob_type = res;

    // update status
    EOBStatus.findOne({
      user_id:req.user,
      eob_type:res
    },function(err,obj) {
      obj.status = "PARSING_EOB";
      obj.save();
    });
    
    // save eob
    eob.save(function(err, eob) {

      // loop entries
      _.each(eobparse.entry, function(e,i) {
        //console.log("EOB url : ",e.fullUrl);
        var entryl = new entry({ url: e.fullUrl }); 

        if (i == eobparse.total-1) {
          EOBStatus.findOne({
            user_id:req.user,
            eob_type:res
          },function(err,obj) {
            obj.status = "EOB_READY";
            obj.save();
          });
        }
        
        if (!eob) {
          return;
        }

        entryl.eob_id = eob;
        
        //save entry
        entryl.save(function(err, entryl) {
          if (entryl) {

            // save billdate
            var startDate = e.resource.billablePeriod && e.resource.billablePeriod.start;
            var endDate = e.resource.billablePeriod && e.resource.billablePeriod.end;

            if (startDate && endDate) {
              var bill = new billable({
	        start_date:e.resource.billablePeriod && e.resource.billablePeriod.start, 
	        end_date:e.resource.billablePeriod && e.resource.billablePeriod.end
              });
              
              bill.entry_id = entryl;
              bill.save();
              
              
              // save diagonosis
              _.each(e.resource.diagnosis, function(d,i) {
                var diag1 = new diagnosis({
	          sequence:d.sequence,
	          icd_version:d.diagnosisCodeableConcept.coding[0].system
                });

                //console.error(entryl);
                diag1.entry_id = entryl;
                
                ICD.count().exec(function (err, count) {
	          //console.log("ICD count : ",count);
	          var random = Math.floor(Math.random() * count);
	          ICD.findOne().skip(random).exec(
	            function (err, result) {
	              //console.log(result);
	              diag1.icd_code = result.code;
                      diag1.icd=result;
	              diag1.save();
	            });	
                });
              });

              // save provider
              var pr = new provider();
              pr.entry_id = entryl;
              NPI.count().exec(function (err, count) {
	        //console.log("NPI count : ",count);
	        var random = Math.floor(Math.random() * count);
	        NPI.findOne().skip(random).exec(
	          function (err, result) {
	            //console.log(result);
	            pr.npi_code = result.npi_code;
                    pr.npi = result;
                    pr.save();
	          });	
              });
            }
          }
        });
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
                      timeline.provider =
                      n.provider_name_prefix + " " +
                      n.provider_first_name + " "+
                      n.provider_last_name + " "+
                      n.provider_name_suffix;
                    } else {
                      timeline.provider = n.org_name;
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

exports.purge_eob = function(req, res) {
  EOB.remove({}).exec();
  entry.remove({}).exec();
  billable.remove({}).exec();
  diagnosis.remove({}).exec();
  provider.remove({}).exec();
  return res.status(200).send("Purge complete");      
}

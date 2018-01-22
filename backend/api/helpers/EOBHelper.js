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
 * Parse EOB
 */
exports.parseEOB = function(req, eobparse) {    
  
  console.log("Start Parsing EOB...");
  var eob = new EOB({ user_id:req.user, total: eobparse.total});
  
  // find eob type
  EOBType.findOne({
    name: "CMS_BLUE_BUTTON"
  }, function(err, res) {

    //console.log(res);
    eob.eob_type = res;

    // update status
    EOBStatus.findOne({
      user_id:req.user,
      eob_type:res
    },function(err,obj) {
      if (err) {
	console.error('EOBStatus not found : ',err);
	return res.status(500).send({
	  messege:err
	});
      };
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
	    console.log("Parsing complete");
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

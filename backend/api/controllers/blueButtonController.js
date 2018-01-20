'user strict';

var mongoose = require('mongoose');
var axios = require('axios');
var fs = require('fs');
var EOBType = mongoose.model('EOBType');
var EOB = mongoose.model('EOB');
var entry = mongoose.model('Entry');
var billable = mongoose.model('Billable');
var diagnosis = mongoose.model('Diagnosis');
var ICDnum = mongoose.model('ICD');
var _ = require('lodash');
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
  return res.status(200).send();
}

function parseEOB(req,eobparse) {

  console.log("Start Parse EOB");

  var eob = new EOB({ user_id:req.user, total: eobparse.total});
  
  // find eob type
  EOBType.findOne({
    name: "CMS_BLUE_BUTTON"
  }).then(function(res) {
    console.log(res);
    eob.eob_type = res;
    // save eob
    eob.save(function(err, eob) {

      // loop entries
      _.each(eobparse.entry, function(e) {
        console.log("EOB url : ",e.fullUrl);
        var entryl = new entry({ url: e.fullUrl}); 
        entryl.eob_id = eob;
        
        //save entry
        entryl.save(function(err, entryl) {
          var bill = new billable({
	    startDate:e.resource.billablePeriod && e.resource.billablePeriod.start, 
	    endDate:e.resource.billablePeriod && e.resource.billablePeriod.end
          });
          bill.entry_id = entryl;
          bill.save();

          // loop diagonosis
          _.each(e.resource.diagnosis, function(d) {
            var diag1 = new diagnosis({
	      sequence:d.sequence,
	      icd_version:d.diagnosisCodeableConcept.coding[0].system
            });
            diag1.entry_id = entryl;
            
            ICDnum.count().exec(function (err, count) {
	      console.log("ICD count : ",count);
	      var random = Math.floor(Math.random() * count);
	      ICDnum.findOne().skip(random).exec(
	        function (err, result) {
	          console.log(result);
	          diag1.icd_code = result.code;
	          diag1.save();
	        });	
            });
          })
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
  return res.status(200).send();
}

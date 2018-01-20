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

/*   axios({
    method:'get',
    url:'https://sandbox.bluebutton.cms.gov/v1/fhir/ExplanationOfBenefit/?patient=20140000008324',
    headers: {
      'Authorization': 'Bearer PETf15vD2vTvMj2c7lB2V0to3wAANG'
    },
    responseType:'json'
  }).then(function(response) {
    console.log(response.data);
    return res.status(200).send();
  }); */
  var eobparse= JSON.parse(fs.readFileSync('../shared/SampleEOB.json'));
  
  var eob = new EOB({ user_id:req.user, total: eobparse.total});
  
 	
	
  
  // save eob
  eob.save(function(err, eob) {
	 var entryl = new entry({ url: eobparse.entry[0].fullUrl}); 
	  entryl.eob_id = eob;
	    
		//save entry
		entryl.save(function(err, entryl){
			var bill = new billable({
				startDate:eobparse.entry[0].resource.billablePeriod.start, 
				endDate:eobparse.entry[0].resource.billablePeriod.end
				});
			bill.entry_id = entryl;
			bill.save();
			
			var diag1 = new diagnosis({
				sequence:eobparse.entry[0].resource.diagnosis[0].sequence,
				icd_version:eobparse.entry[0].resource.diagnosis[0].diagnosisCodeableConcept.coding[0].system
			});
			diag1.entry_id = entryl;
			
			ICDnum.count().exec(function (err, count) {
				console.error("ICD count : ",count);
				var random = Math.floor(Math.random() * count);
			    ICDnum.findOne().skip(random).exec(
					function (err, result) {
						console.error(result);
						diag1.icd_code = result.code;
						diag1.save();
				});	
			});
		});
  });

  //console.error(eobparse.entry[0].resource);
    // find eob type
  EOBType.findOne({
	  name: "CMS_BLUE_BUTTON"
  }).then(function(res) {
	  console.error(res);
	  eob.eob_type = res;
	  eob.save();
  });
  
  
  
  
  console.error(req.user);
  
  
  //newType.save();
  //bill.save();
  return res.status(200).send();
}

/*
 * send status
 */
exports.status = function(req, res) {
  console.log('GET /bb/status : ',req.params);
  return res.status(200).send();
}

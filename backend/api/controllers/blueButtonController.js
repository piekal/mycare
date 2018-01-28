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
var HIT = mongoose.model('HIT');
var Obs = mongoose.model('Observation');
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


        // 1. start with eob
        EOB.findOne({
          eob_type:eobtype,
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
  return res.status(200).send("Purge complete");}


//CareEvolution Implementation

// exports.observation = function(req, res) {
//
// var tokenCareEvolution = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlA2aVh4cEQ4MW1XM0hqaHU5NmlQcVVoaTl3WSJ9.eyJpc3MiOiJodHRwczovL2ZoaXIuY2FyZWV2b2x1dGlvbi5jb20vTWFzdGVyLkFkYXB0ZXIxLldlYkNsaWVudC8iLCJhdWQiOiJodHRwczovL2ZoaXIuY2FyZWV2b2x1dGlvbi5jb20vTWFzdGVyLkFkYXB0ZXIxLldlYkNsaWVudC8iLCJleHAiOjE1MTc2NzYwOTcsIm5iZiI6MTUxNzA3NjA5NywianRpIjoiYjZlOGVmNWItOGRjOC00YTRlLTlhOTgtYmIxNDI4ZTIxNmJlIiwic3ViIjoiOTAzMGE1MDAtOWUwMC1lODExLTgxMzYtMGE2OWMxYjMyMjViIiwidXNlcl9uYW1lIjoiYWFyb24uc2VpYiIsImNsaWVudF9pZCI6ImFkYzk3MDI5LWY4OTEtNDkzMS1hZDE2LTJhMzExYzc2MDc2ZCJ9.G2kDtBWN8hRtKiG7xTo5NbdVPYhrbHFOe7Dlak5si0IkS-uE9Ak110jPno3PBxkal06mgt6bZQBwNV3oxI3zvzOuiBWhEATbp4jWhYmTbKWf82E_ArnkPTPUEJCU2caM2cFwQHQl90EiO7sm69VbGY5XHNi7Hi1zyyi4XMBreE571IxK2T5O_9zuxls_lIa-GKV_8YNFjL4yD36bEj_HgKJrq5RvyoQrzuWL7LUoXHOQq2o_S3JN2zvjvv7dd3xVFXKYpZ8o83AhuZdxsujxDjuswvr4n-QLRXKek-dje1XAPi6Y6_8G9VNxVics2IE1dCYVGIGB6dnJS2ob6qJESA'
//
// console.error(req.params.entry_id);
//
// var apiEnd = 'nullWrong'
//
//
//    HIT.findOne({
//     name:'CareEvolution'
//   }).exec(function(err, hit) {
//     //console.error(hit);
//     //console.log(hit.api_endpoint)
//     apiEnd = hit.api_endpoint + '/Observation?_count=1&_format=json'
//     //console.log(apiEnd)
//     //return res.status(200).send(hit);
//
//   axios({
//     method:'get',
//     url: apiEnd,
//     headers: {
//     'Authorization': 'Bearer ' + tokenCareEvolution
//       },
//     responseType:'json'
//     }).then(response => {
//     var Obs_s = new Obs({
//       entry_id:req.params.entry_id,
//       observation_id: response.data.entry[0].resource.id,
//       resource_type: response.data.entry[0].resource.resourceType ,
//       patient_id:response.data.entry[0].resource.subject.reference ,
//        effective_date: response.data.entry[0].resource.effectiveDateTime,
//        status: response.data.entry[0].resource.status
//      });
//     Obs_s.save()
//
//     }).catch(error => {
//       console.log(error); });
//
//   return res.status(200).send('Good to Go!');
// });
// }


exports.observation = function(req, res) {

var tokenCerner = "eyJraWQiOiIyMDE4LTAxLTI4VDE3OjAwOjA4LjQ2NS5lYyIsInR5cCI6IkpXVCIsImFsZyI6IkVTMjU2In0.eyJpc3MiOiJodHRwczpcL1wvYXV0aG9yaXphdGlvbi5zYW5kYm94Y2VybmVyLmNvbVwvIiwiZXhwIjoxNTE3MTY5NTg1LCJpYXQiOjE1MTcxNjg5ODUsImp0aSI6ImZmMzBiOWUxLWQ4ZTEtNDI4Mi1iOGUzLTliNzA5ZjcyNzBkZiIsInVybjpjZXJuZXI6YXV0aG9yaXphdGlvbjpjbGFpbXM6dmVyc2lvbjoxIjp7InZlciI6IjEuMCIsInByb2ZpbGVzIjp7InNtYXJ0LXYxIjp7InBhdGllbnRzIjpbIjQzNDIwMDgiXSwiYXpzIjoicGF0aWVudFwvT2JzZXJ2YXRpb24ucmVhZCJ9fSwiY2xpZW50Ijp7Im5hbWUiOiJNeUNhcmUiLCJpZCI6ImQyYjExMDJmLTcwZWQtNDY4OS1iMDBmLTljM2Y5YTU0NjBkYiJ9LCJ1c2VyIjp7InByaW5jaXBhbCI6IkxRNFNnM0QyOEJSIiwicGVyc29uYSI6InBhdGllbnQiLCJpZHNwIjoiNjg3ZjI5ZGQtNjlkZC00ZGU1LWFjYjEtZmQ4YTIyNDFlZjNhIiwicHJpbmNpcGFsVXJpIjoidXJuOmNlcm5lcjppZGVudGl0eS1mZWRlcmF0aW9uOnJlYWxtOjY4N2YyOWRkLTY5ZGQtNGRlNS1hY2IxLWZkOGEyMjQxZWYzYTpwcmluY2lwYWw6TFE0U2czRDI4QlIiLCJpZHNwVXJpIjoiaHR0cHM6XC9cL3NhbmRib3hjZXJuZXJoZWFsdGguY29tXC9zYW1sXC9yZWFsbXNcLzY4N2YyOWRkLTY5ZGQtNGRlNS1hY2IxLWZkOGEyMjQxZWYzYVwvbWV0YWRhdGEifSwidGVuYW50IjoiMGI4YTAxMTEtZThlNi00YzI2LWE5MWMtNTA2OWNiYzZiMWNhIn19.oBgLD-wDlzMT72k3s1QPb_8hHIEWOZ6psXQgrf7fbXe4P6Bz9KFDgShqeI_9B0GLE9FDRZm1TwhLuyb-ge0Keg"

console.error(req.params.entry_id);

var apiEnd = 'nullWrong'


   HIT.findOne({
    name:'cerner'
  }).exec(function(err, hit) {
    //console.error(hit);
    //console.log(hit.api_endpoint)
    apiEnd = hit.api_endpoint + '/Observation?patient=3998008&_count=1'
    //console.log(apiEnd)
    //return res.status(200).send(hit);

  axios({
    method:'get',
    url: apiEnd,
    headers: {
    'Authorization': 'Bearer ' + tokenCerner,
    'Accept': 'application/json+fhir'
      },
    responseType:'json'
    }).then(response => {
    var Obs_s = new Obs({
      entry_id:req.params.entry_id,
      observation_id: response.data.entry[0].resource.id,
      resource_type: response.data.entry[0].resource.resourceType ,
      patient_id:response.data.entry[0].resource.subject.reference ,
       effective_date: response.data.entry[0].resource.effectiveDateTime,
       status: response.data.entry[0].resource.status
     });
    Obs_s.save()

    }).catch(error => {
      console.log(error); });

  return res.status(200).send('Good to Go Cerner!');
});
}

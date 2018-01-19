'user strict';

var axios = require('axios');

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
    console.log(response.data);
    return res.status(200).send();
  });
  
}

/*
 * send status
 */
exports.status = function(req, res) {
  console.log('GET /bb/status : ',req.params);
  return res.status(200).send();
}

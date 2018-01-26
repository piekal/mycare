'use strict';

var mongoose = require('mongoose'),
    axios = require('axios'),
    querystring = require('querystring');


/*
 * provider callback with token
 */
exports.provider_callback = function(req, res){
  console.log('GET /npi/:npi_id/callback : ',req.params, req.query);

  axios({
    method:'post',
    url:'https://fhir.careevolution.com/Master.Adapter1.WebClient/api/OAuth2/Token',
    headers: {
      'Content-Type':'application/x-www-form-urlencoded'
    },
    auth:{
      username:'adc97029-f891-4931-ad16-2a311c76076d',
      password:'s06Up0SpUg'
    },
    data:querystring.stringify({
      grant_type:'authorization_code',
      code:req.query.code,
      redirect_uri:'mycare://careevolution/callback'
    })
  }).then(function(resp) {
    console.error(resp.data)
  }, function(err) {
    console.error(err.response.data);
  });

  return res.status(200).send();
}

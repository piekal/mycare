'use strict';
var mongoose = require('mongoose'),
  axios = require('axios'),
  querystring = require('querystring'),
  HIT = mongoose.model('HIT');

/*
 * provider callback with token
 */
exports.provider_code_callback = function (req, res) {
  console.log('GET /oauth/code/', req.params, req.query);

  // TODO
  var hits = HIT.findOne({
    'name': req.query.provider
  }, function (err, hit) {

    if (hit.name == 'CareEvolution') {
      axios({
        method: 'post',
        url: hit.token_endpoint,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: 'adc97029-f891-4931-ad16-2a311c76076d',
          password: 's06Up0SpUg'
        },
        data: querystring.stringify({
          grant_type: 'authorization_code',
          code: req.query.code,
          redirect_uri: 'mycare://' + hit.name + '/callback'
        })
      }).then(function (resp) {
        console.error(resp.data);
        return res.status(200).send(resp.data);
      }, function (err) {
        console.error(err.response.data);
        return res.status(500).send(err.response.data);
      });
    } else if(hit.name == 'cerner'){
      console.log("In cerner", hit.token_endpoint)
      axios({
        method: 'post',
        url: hit.token_endpoint,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
          grant_type: 'authorization_code',
          code: req.query.code,
          client_id: hit.client_id,
          state: hit.state
        })
      }).then(function (resp) {
        console.error(resp.data);
        return res.status(200).send(resp.data);
      }, function (err) {
        console.error(err.response.data);
        return res.status(500).send(err.response.data);
      });
    }
    else{
      axios({
        method: 'post',
        url: hit.token_endpoint,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
          grant_type: 'authorization_code',
          code: req.query.code,
          redirect_uri: 'mycare://' + hit.name + '/callback',
          client_id: hit.client_id
        })
      }).then(function (resp) {
        console.error(resp.data);
        return res.status(200).send(resp.data);
      }, function (err) {
        console.error(err.response.data);
        return res.status(500).send(err.response.data);
      });
    }
  });




}
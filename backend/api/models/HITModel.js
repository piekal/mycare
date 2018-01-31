'use strict';

var mongoose = require('mongoose');

var HITSchema = new mongoose.Schema({
  name: {type:String},
  api_endpoint:{type:String},
  token_endpoint:{type:String},
  oauth_url:{type:String},
  client_id:{type:String},
  state : {type:String}
}, {timestamps: true});

mongoose.model('HIT', HITSchema);

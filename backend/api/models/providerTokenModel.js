'use strict';

var mongoose = require('mongoose');

var ProviderTokenSchema = new mongoose.Schema({  
  payer: {type: mongoose.Schema.Types.ObjectId, ref: 'Payer'},
  user_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  token: {
    type: String
  }
}, {timestamps: true});

mongoose.model('ProviderToken', ProviderTokenSchema);

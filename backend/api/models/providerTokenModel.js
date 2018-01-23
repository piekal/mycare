'use strict';

var mongoose = require('mongoose');

var ProviderTokenSchema = new mongoose.Schema({  
  eob_type: {type: mongoose.Schema.Types.ObjectId, ref: 'EOBType'},
  user_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  token: {
    type: String
  }
}, {timestamps: true});

mongoose.model('ProviderToken', ProviderTokenSchema);

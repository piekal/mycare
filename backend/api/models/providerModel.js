'use strict';

var mongoose = require('mongoose');

var ProviderSchema = new mongoose.Schema({
  entry_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Entry'},
  npi_code: {type:String},
  npi: {type: mongoose.Schema.Types.ObjectId, ref: 'NPI'},
}, {timestamps: true});

mongoose.model('Provider', ProviderSchema);

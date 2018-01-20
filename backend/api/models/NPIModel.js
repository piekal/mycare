'use strict';

var mongoose = require('mongoose');

var NPISchema = new mongoose.Schema({
  npi_code: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  type: {
    type: String
  },
  org_name:{
    type: String
  },
  provider_last_name:{
    type: String
  },
  provider_first_name:{
    type: String
  },
  provider_middle_name:{
    type: String
  },
  provider_name_prefix:{
    type: String
  },
  provider_name_suffix:{
    type: String
  },
  provider_phone:{
    type: String
  }
}, {timestamps: true});

mongoose.model('NPI', NPISchema);

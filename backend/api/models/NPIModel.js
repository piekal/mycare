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
    type: Number
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
  },
  hit:{type: mongoose.Schema.Types.ObjectId, ref: 'HIT'}
}, {timestamps: true});

NPISchema.methods.getProviderName = function() {
  var providerName;
  if (this.type === 1) {    
    var prefix = this.provider_name_prefix.trim.length > 0 ?
	this.provider_name_prefix.trim() + " " : "";
    var suffix = this.provider_name_suffix.trim.length > 0 ?
	" " +this.provider_name_suffix.trim() : "";		      		      
    providerName =
      prefix +
      this.provider_first_name.trim() + " "+
      this.provider_last_name.trim() +
      suffix;
  } else {
    providerName = this.org_name.trim();
  }  
  return providerName;
}

mongoose.model('NPI', NPISchema);

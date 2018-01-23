'use strict';

var mongoose = require('mongoose');

var diagnosisSchema = new mongoose.Schema({  
  entry_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Entry'},
  sequence: {type: String},
  icd_code: {type: String},
  icd_version: {type:String},
  icd: {type: mongoose.Schema.Types.ObjectId, ref: 'ICD'},
}, {timestamps: true});

mongoose.model('Diagnosis', diagnosisSchema);

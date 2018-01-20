'use strict';

var mongoose = require('mongoose');

var ICDSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  desc:{
    type: String
  }
}, {timestamps: true});

mongoose.model('ICD', ICDSchema);

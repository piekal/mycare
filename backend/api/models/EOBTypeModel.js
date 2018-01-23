'use strict';

var mongoose = require('mongoose');

var EOBTypeSchema = new mongoose.Schema({  
  name: {
    type: String
  },
  desc:{
    type: String
  }
}, {timestamps: true});


mongoose.model('EOBType', EOBTypeSchema);

'use strict';

var mongoose = require('mongoose');

var PayerSchema = new mongoose.Schema({  
  name: {
    type: String
  },
  desc:{
    type: String
  }
}, {timestamps: true});


mongoose.model('Payer', PayerSchema);

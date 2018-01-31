'use strict';

var mongoose = require('mongoose');

var EOBStatusSchema = new mongoose.Schema({  
  payer: {type: mongoose.Schema.Types.ObjectId, ref: 'Payer'},
  user_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  status: {
    type: String
  }
}, {timestamps: true});


mongoose.model('EOBStatus', EOBStatusSchema);

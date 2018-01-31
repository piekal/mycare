'use strict';

var mongoose = require('mongoose');

var EOBSchema = new mongoose.Schema({  
  payer: {type: mongoose.Schema.Types.ObjectId, ref: 'Payer'},
  user_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  total:{
    type: String
  }
}, {timestamps: true});

mongoose.model('EOB', EOBSchema);

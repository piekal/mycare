'use strict';

var mongoose = require('mongoose');

var EOBStatusSchema = new mongoose.Schema({  
  eob_type: {type: mongoose.Schema.Types.ObjectId, ref: 'EOBType'},
  user_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  status: {
    type: String
  }
}, {timestamps: true});


mongoose.model('EOBStatus', EOBStatusSchema);

'use strict';

var mongoose = require('mongoose');

var EOBSchema = new mongoose.Schema({  
  eob_type: {type: mongoose.Schema.Types.ObjectId, ref: 'EOBType'},
  user_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  total:{
    type: String
  }
}, {timestamps: true});

mongoose.model('EOB', EOBSchema);

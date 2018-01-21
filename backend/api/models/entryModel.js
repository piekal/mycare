'use strict';

var mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({  
  eob_id: {type: mongoose.Schema.Types.ObjectId, ref: 'EOB'},
  url:{
    type: String
  }
}, {timestamps: true});


mongoose.model('Entry', entrySchema);

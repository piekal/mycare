'use strict';

var mongoose = require('mongoose');

var TokenTypeSchema = new mongoose.Schema({
  name: {type: String },  
  desc: {type: String }  
}, {timestamps: true});

mongoose.model('TokenType', TokenTypeSchema);

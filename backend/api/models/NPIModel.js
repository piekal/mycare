'use strict';

var mongoose = require('mongoose');

var NPCSchema = new mongoose.Schema({
  npi_code: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  desc:{
    type: String
  }
}, {timestamps: true});

mongoose.model('NPC', NPCSchema);

'use strict';

var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  email:{
    type: String
  },
  firstName:{
    type: String
  },
  lastName: {
    type:String
  },
  city: {
    type: String
  },
  dob : {
    type : String
  },
  race : {
    type : String
  },
  avatar : {
    type : String
  },
  payer: {type: mongoose.Schema.Types.ObjectId, ref: 'Payer'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

mongoose.model('Profile', ProfileSchema);

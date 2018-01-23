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
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

mongoose.model('Profile', ProfileSchema);

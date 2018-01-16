'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

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


ProfileSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password)
}

mongoose.model('Profile', ProfileSchema);

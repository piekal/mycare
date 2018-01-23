'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  hash_password: String,
  firstName:{
    type: String
  },
  lastName: {
    type:String
  }
}, {timestamps: true});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password)
}

mongoose.model('User', UserSchema);

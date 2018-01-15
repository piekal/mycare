'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  hash_password: String
}, {timestamps: true});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password)
}

mongoose.model('User', UserSchema);

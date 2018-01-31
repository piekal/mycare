'use strict';

var mongoose = require('mongoose');

var UserTokenSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  token_type: {type: mongoose.Schema.Types.ObjectId, ref: 'TokenType'},
  token: { type: String }
}, {timestamps: true});

mongoose.model('UserToken', UserTokenSchema);

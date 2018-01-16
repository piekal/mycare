'user strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    Profile = mongoose.model('Profile');

/*
 * fetch get profile 
 */
exports.get_profile = function(req, res) {
  console.log('GET Profile : ',req.params);

  Profile.findOne({
    user:req.params.user_id
  }).exec(function(err,profile) {
    if (err) {
      res.status(400).send({
        message: err
      });      
    } else {
      return res.json(profile);
    }    
  });
}

exports.create_profile = function(req, res) {
  console.log('POST Profile : ',req.params);

  
}

'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    Profile = mongoose.model('Profile');

/*
 * fetch get profile 
 */
exports.get_profile = function(req, res) {
  console.log('GET Profile : ',req.query);
  Profile.findOne({
    user:req.query.user_id
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

// Updating profile
exports.update_profile = function(req, res) {
  console.log('PUT Profile : ',req.body);
  Profile.update({user: req.body.user}, req.body, function(err, profile) {
        if (err) {
          console.error('Profile update failed : ',err);
          return res.status(500).send({
            message: err
          });
        }
        else{
          return res.status(200).send({
            message: 'Profile Updated Successfully'
          });
        }
  });
}
// Create new profile
exports.new_profile = function(req, res) {
  console.log('POST Profile : ',req.body);
  var profile = new Profile(req.body);
  
  profile.save(function(err, profile) {
        if (err) {
          console.error('Profile Save failed : ',err);
          return res.status(500).send({
            message: err
          });
        }
        else{
          return res.status(200).send({
            message: 'Profile Saved Successfully'
          });
        }
  });
}
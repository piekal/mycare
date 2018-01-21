'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),    
    User = mongoose.model('User'),
    Profile = mongoose.model('Profile');

/*
 * Creates user and profile
 */
exports.register = function(req, res){
  console.log('Registering User : ',req.body);
  var newUser = new User(req.body);
  
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user) {
    if (err) {
      console.error('Registration failed : ',err);
      return res.status(400).send({
        message: err
      });

    // if new user is created
    } else {
      console.log('Registration success');

      // make user token is empty
      user.hash_password = undefined;      
      
      // create new profile 
      var newProfile = new Profile({
        user: newUser._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
      newProfile.save(function(err) {});
      user.profile = newProfile;      
      return res.json({
        userId:user._id
      });
    }
  });
}

exports.sign_in = function(req, res){
  console.log('Sign in User : ',req.body);
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      console.error('Authentication failed. User not found.');
      res.status(401).json({ message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (!user.comparePassword(req.body.password)) {
        console.error('Authentication failed. Wrong password.');
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        console.log('Sign in User Success');
        return res.json({
          token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs'),
          userId:user._id
        });
      }
    }
  });
}

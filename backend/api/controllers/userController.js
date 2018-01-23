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
  console.log('POST /user : ',req.body.email);

  // create new user
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user) {

    if (err) {
      console.error('User save failed : ',err);
      return res.status(500).send({
        message: err
      });
    }

    // create new profile 
    var newProfile = new Profile({
      user: newUser._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });

    // save profile
    newProfile.save(function(err,profile) {
      if (err){
	console.error('Profile save failed : ',err);
	return res.status(500).send({
	  messege:err
	});
      } 
    });

    // if new user is created
    console.log('Registration success');
    
    // return user Id
    return res.json({
      userId:user._id
    });   
  });
}

/*
 * Sign in user
 */
exports.sign_in = function(req, res){
  console.log('POST /sign_in : ',req.body);

  // find user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) {
      console.error('Find user failed : ',err);
      return res.status(500).send({
	messege:err
      });
    };

    // if no user
    if (!user) {
      console.error('Authentication failed. User not found.');
      return res.status(401).json({
	message: 'Authentication failed. User not found.'
      });
    }

    // check password
    if (!user.comparePassword(req.body.password)) {
      console.error('Authentication failed. Wrong password.');
      res.status(401).json({
	message: 'Authentication failed. Wrong password.'
      });      
    } else {
      console.log('Sign in User Success');
      return res.json({

	// create token
	token: jwt.sign({
	  email: user.email,
	  fullName: user.fullName,
	  _id: user._id
	}, 'RESTFULAPIs'),

	// send user id
	userId:user._id
      });
    }    
  });
}

'use strict';

module.exports = function(app) {
  var userHandler = require('../controllers/userController');
  var profileHandler = require('../controllers/profileController');
  
  app.route('/api/v1/user')
     .post(userHandler.register);
  
  app.route('/api/v1/user/sign_in')
     .post(userHandler.sign_in);
  
  app.route('/api/v1/user/:user_id/profile')
     .get(userHandler.loginRequired, profileHandler.get_profile)
     .post(userHandler.loginRequired, profileHandler.create_profile);  
};

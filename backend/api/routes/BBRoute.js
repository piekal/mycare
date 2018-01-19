'use strict';

module.exports = function(router) {
  var bbHandler = require('../controllers/blueButtonController');
  
  router.route('/user')
     .post(userHandler.register);
  
  router.route('/user/sign_in')
     .post(userHandler.sign_in);
  
  router.route('/user/:user_id/profile')
     .get(userHandler.loginRequired, profileHandler.get_profile)
     .post(userHandler.loginRequired, profileHandler.create_profile);  
};

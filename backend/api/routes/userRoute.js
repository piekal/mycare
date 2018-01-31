
'use strict';

module.exports = function(router) {
  var userHandler = require('../controllers/userController');
  var commonHandler = require('../controllers/commonController');
  var profileHandler = require('../controllers/profileController');
  
  router.route('/user')
     .post(userHandler.register);
  
  router.route('/user/sign_in')
     .post(userHandler.sign_in);
  
  router.route('/user/profile')
     .get(commonHandler.loginRequired, profileHandler.get_profile)
     .put(commonHandler.loginRequired, profileHandler.update_profile);  
};

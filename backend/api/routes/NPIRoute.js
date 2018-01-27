'use strict';

module.exports = function(router) {
  var npiHandler = require('../controllers/NPIController');
  var commonHandler = require('../controllers/commonController');
  
  router.route('/oauth/code')
    .get(commonHandler.loginRequired, npiHandler.provider_code_callback);
  
};

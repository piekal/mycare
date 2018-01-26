'use strict';

module.exports = function(router) {
  var npiHandler = require('../controllers/NPIController');
  var commonHandler = require('../controllers/commonController');
  
  router.route('/npi/:npi_id/callback')
    .get(commonHandler.loginRequired, npiHandler.provider_callback);
  
};

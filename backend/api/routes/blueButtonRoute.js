'use strict';

module.exports = function(router) {
  var bbHandler = require('../controllers/blueButtonController');
  var commonHandler = require('../controllers/commonController');
  
  router.route('/bb/provider/callback')
    .get(commonHandler.loginRequired, bbHandler.provider_callback);
  
  router.route('/bb/status')
    .get(commonHandler.loginRequired, bbHandler.status);   
};

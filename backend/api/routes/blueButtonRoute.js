'use strict';

module.exports = function(router) {
  var bbHandler = require('../controllers/blueButtonController');
  var commonHandler = require('../controllers/commonController');
  
  router.route('/bb/provider/callback')
    .get(commonHandler.loginRequired, bbHandler.provider_callback);
  
  router.route('/bb/status')
    .get(commonHandler.loginRequired, bbHandler.status);
  
  router.route('/bb/timeline')
    .get(commonHandler.loginRequired, bbHandler.timeline);   
  
  router.route('/bb/purge')
    .get(commonHandler.loginRequired, bbHandler.purge_eob);
  
  router.route('/bb/:entry_id/diagnosis')
    .get(commonHandler.loginRequired, bbHandler.get_diagnosis);
};

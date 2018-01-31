'use strict';

module.exports = function(router) {
  var patientHandler = require('../controllers/patientController');
  var commonHandler = require('../controllers/commonController');
  
  router.route('/patient/timeline')
    .get(commonHandler.loginRequired, patientHandler.timeline);
  
  router.route('/patient/provider')
    .get(commonHandler.loginRequired, patientHandler.get_unique_provider);

};

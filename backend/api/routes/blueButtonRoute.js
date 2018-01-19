'use strict';

module.exports = function(router) {
  var bbHandler = require('../controllers/blueButtonController');
  
  router.route('/bb/provider/callback')
     .get(bbHandler.provider_callback);
  
};

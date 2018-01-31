'use strict';

module.exports = function(router) {
  var commonHandler = require('../controllers/commonController');
  
  router.route('/metadata')
    .post(commonHandler.loginRequired, commonHandler.load_metadata);

  router.route('/purge')
    .post(commonHandler.loginRequired, commonHandler.purge_metadata);
  
  
};

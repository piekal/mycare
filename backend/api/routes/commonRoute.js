'use strict';

module.exports = function(router) {
  var commonHandler = require('../controllers/commonController');
  
  router.route('/metadata')
    .post(commonHandler.load_metadata);

  router.route('/db')
    .delete(commonHandler.purge_data);  
};

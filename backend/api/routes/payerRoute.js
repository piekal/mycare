'use strict';

module.exports = function(router) {
  var payerHandler = require('../controllers/payerController');
  var commonHandler = require('../controllers/commonController');

  router.route('/payer')
    .get(commonHandler.loginRequired, payerHandler.get_payer);
  
  router.route('/payer/:payer_id/code')
    .get(commonHandler.loginRequired, payerHandler.payer_callback);
  
  router.route('/payer/status')
    .get(commonHandler.loginRequired, payerHandler.status);
  
  router.route('/payer/timeline')
    .get(commonHandler.loginRequired, payerHandler.timeline);   
  
  router.route('/payer/purge')
    .get(commonHandler.loginRequired, payerHandler.purge_eob);
  
  router.route('/payer/:entry_id/diagnosis')
    .get(commonHandler.loginRequired, payerHandler.get_diagnosis);

  router.route('/entry/:entry_id/observation')
    .get(commonHandler.loginRequired, payerHandler.observation);
  
  router.route('/payer/eob/unique')
      .get(commonHandler.loginRequired, payerHandler.get_unique_provider);
};

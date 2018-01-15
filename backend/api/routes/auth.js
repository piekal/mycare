'use strict';
module.exports = function(app) {
  var userHandler = require('../controllers/userController');

  // todoList Routes
  app.route('/auth/register')
    .post(userHandler.register);
};

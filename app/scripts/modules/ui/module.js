'use strict';

module.exports = angular
  .module('showtrackr.ui', [
    'ui.router',
    'showtrackr.common',
    'showtrackr.data',
    'showtrackr.templates',
    'ui.bootstrap',
    'ngResource',
    'ngMessages',
    'ngCookies',
  ])
  .config(require('./config/route'))
  .controller('HomeController', require('./controllers/homeController'))
  .controller('LoginController', require('./controllers/connect/loginController'))
  .controller('SignupController', require('./controllers/connect/signupController'))
;

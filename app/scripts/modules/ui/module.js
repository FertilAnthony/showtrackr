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
    'dibari.angular-ellipsis',
  ])
  .config(require('./config/route'))
  .controller('HomeController',   require('./controllers/homeController'))
  .controller('LoginController',  require('./controllers/auth/loginController'))
  .controller('SignupController', require('./controllers/auth/signupController'))
  .directive('repeatPassword',    require('./directives/repeatPassword'))
  .controller('DetailController', require('./controllers/detailController'))
  .controller('ListController',   require('./controllers/listController'))
  .controller('NavbarController', require('./controllers/navbarController'))
;

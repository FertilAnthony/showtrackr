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
  .config(require('./config/route')).run(function ($rootScope, $location, AuthService) {
    console.log('pass');
    //watching the value of the currentUser variable.
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      console.log(toState);
      console.log(toParams);
      console.log(fromState);
      console.log(fromParams);
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!$rootScope.currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) === -1 )) {
        AuthService.currentUser();
      }
    });
    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  })
  .controller('HomeController',   require('./controllers/homeController'))
  .controller('LoginController',  require('./controllers/auth/loginController'))
  .controller('SignupController', require('./controllers/auth/signupController'))
  .directive('repeatPassword',    require('./directives/repeatPassword'))
  .controller('DetailController', require('./controllers/detailController'))
  .controller('ListController',   require('./controllers/listController'))
  .controller('NavbarController', require('./controllers/navbarController'))
;

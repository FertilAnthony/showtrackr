'use strict';

/**
 * @ngInject
 */
function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  // Declare routes
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeController as vm'
    })
    .state('showDetail', {
      url: '/shows/:id',
      templateUrl: 'views/detail.html',
      controller: 'DetailController as vm'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/connect/login.html',
      controller: 'LoginController as vm'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/connect/signup.html',
      controller: 'SignupController as vm'
    })
    .state('list', {
      url: '/list',
      templateUrl: 'views/list.html',
      controller: 'ListController as vm'
    });
  // Default route
  $urlRouterProvider.otherwise('/');
  // Configure html5
  $locationProvider.html5Mode(true);
}

module.exports = RouteConfig;

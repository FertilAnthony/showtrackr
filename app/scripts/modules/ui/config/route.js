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
      controller: 'HomeController as vm',
      resolve: {
        topShowsFactory: function(ShowsList) {
          return ShowsList.getShowsList();
        }
      }
    })
    .state('showDetail', {
      url: '/show/:id',
      templateUrl: 'views/showDetail.html',
      controller: 'DetailController as vm',
      resolve: {
        showDetailFactory: function(ShowsList, $stateParams) {
          return ShowsList.getShowById($stateParams.id);
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/auth/login.html',
      controller: 'LoginController as vm'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/auth/signup.html',
      controller: 'SignupController as vm'
    })
    .state('shows', {
      url: '/shows/page/:pagination',
      templateUrl: 'views/listShows.html',
      controller: 'ListController as vm',
      resolve: {
        listShowsFactory: function(ShowsList, $stateParams) {
          return ShowsList.getPaginatedShowsList($stateParams.pagination);
        }
      }
    });
  // Default route
  $urlRouterProvider.otherwise('/');
  // Configure html5
  $locationProvider.html5Mode(true);
}

module.exports = RouteConfig;

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

/*RouteConfig().run(function ($rootScope, $location, Auth) {
  //watching the value of the currentUser variable.
  $rootScope.$watch('currentUser', function(currentUser) {
    // if no currentUser and on a page that requires authorization then try to update it
    // will trigger 401s if user does not have a valid session
    if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
      Auth.currentUser();
    }
  });
  // On catching 401 errors, redirect to the login page.
  $rootScope.$on('event:auth-loginRequired', function() {
    $location.path('/login');
    return false;
  });
});*/
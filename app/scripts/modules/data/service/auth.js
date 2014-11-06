'use strict';

/**
 * @ngInject
 */
function AuthService($log, $http, $location, $rootScope, $window) {

	var token = $window.localStorage.token;
	if (token) {
		var payload = JSON.parse($window.atob(token.split('.')[1]));
		$rootScope.currentUser = payload.user;
	}

	this.signup = function signup(user) {
		$log.log(user);
		return $http.post('/auth/signup', user).success(function() {
			$location.path('/');
			$log.log('success');
		})
		.error(function(response) {
			$log.log(response);
		});
	};

	this.logout = function logout() {
		delete $window.localStorage.token;
		$rootScope.currentUser = null;
		$location.path('home');
	};

}


module.exports = AuthService;
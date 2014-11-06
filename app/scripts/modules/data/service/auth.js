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
		return $http.post('/auth/signup', user).success(function(data) {
			 $window.localStorage.token = data.token;
			var payload = JSON.parse($window.atob(data.token.split('.')[1]));
			$rootScope.currentUser = payload.user;
			$location.path('/');
			$log.log(data);
		})
		.error(function(response) {
			$log.log(response);
		});
	};

	this.login = function login(user) {
		return $http.post('/auth/login', user).success(function(data) {
			$location.path('/');
			$log.log(data);
		});
	}

	this.logout = function logout() {
		delete $window.localStorage.token;
		$rootScope.currentUser = null;
		$location.path('home');
	};

}


module.exports = AuthService;
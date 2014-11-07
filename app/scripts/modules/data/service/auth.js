'use strict';

/**
 * @ngInject
 */
function AuthService($log, $http, $location, $rootScope, $cookieStore, UserFactory) {
	$rootScope.currentUser = $cookieStore.get('user') || null;
	$cookieStore.remove('user');	

	this.signup = function signup(userinfo, callback) {
		var cb = callback || angular.noop;

		UserFactory.auth().save(userinfo, function(user) {
			$rootScope.currentUser = user;
			return cb();
		},
		function(err) {
			return cb(err.data);
		});
	};

	this.login = function login(user) {
		return $http.post('/auth/login', user).success(function(data) {
			$location.path('/');
			$log.log(data);
		});
	};

	this.logout = function logout(callback) {
		var cb = callback || angular.noop;

		/*Session.delete(function(res) {
			$rootScope.currentUser = null;
			return cb();
		},
		function(err) {
			return cb(err.data);
		});*/
	};

	this.currentUser = function currentUser() {
		UserFactory.session().get(function(user) {
			$log.log(user);
			$rootScope.currentUser = user;
		});
	};

}


module.exports = AuthService;
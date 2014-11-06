'use strict';

/**
* @ngInject
*/
function AuthFactory($log, $resource) {
	// Interface
	var factory = {
		localLogin: localLogin,
		localSignup: localSignup
	};
	return factory;

	// Implentation

	function localLogin() {
		return $resource('/auth/login');
	}

	function localSignup() {
		return $resource('/auth/signup');
	}
}

module.exports = AuthFactory;
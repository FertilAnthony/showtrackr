'use strict';

/**
* @ngInject
*/
function UserFactory($log, $resource) {
	// Interface
	var factory = {
		auth: auth,
		session: session
	};
	return factory;

	// Implentation

	function auth() {
		return $resource('/auth/users/:id/', {},
			{
				'update': {
					method:'PUT'
				}
			}
		);
	}

	function session() {
		return $resource('/auth/session/');
	}
}

module.exports = UserFactory;
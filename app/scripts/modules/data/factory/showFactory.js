'use strict';

/**
* @ngInject
*/
function ShowFactory($log, $resource) {
	// Interface
	var factory = {
		getShows: getShows
	};
	return factory;

	// Implentation

	function getShows() {
		return $resource('/api/shows/:_id');
	}
}

module.exports = ShowFactory;
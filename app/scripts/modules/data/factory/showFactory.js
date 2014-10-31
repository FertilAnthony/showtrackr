'use strict';

/**
* @ngInject
*/
function ShowFactory($log, $resource) {
	// Interface
	var factory = {
		getPaginatedShows: getPaginatedShows
	};
	return factory;

	// Implentation

	function getPaginatedShows() {
		return $resource('/api/shows/:id', {id:'@id'});
	}
}

module.exports = ShowFactory;
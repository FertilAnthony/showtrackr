'use strict';

/**
* @ngInject
*/
function ShowFactory($log, $resource) {
	// Interface
	var factory = {
		getPaginatedShows: getPaginatedShows,
		getTopShows: getTopShows
	};
	return factory;

	// Implentation

	function getPaginatedShows() {
		return $resource('/api/shows/page/:pagination', {pagination:'@pagination'});
	}

	function getTopShows() {
		return $resource('/api/shows/:id', {id:'@id'});
	}
}

module.exports = ShowFactory;
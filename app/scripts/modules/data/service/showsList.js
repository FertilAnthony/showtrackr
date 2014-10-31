'use strict';

/**
 * @ngInject
 */
function ShowsListService($q, ShowFactory, $log) {

  this.getShowsList = function getShowsList() {
    var deferred = $q.defer();

    function onGetShowsListWithSuccess(response) {
      var shows = response;

      deferred.resolve(shows);
    }

    ShowFactory.getPaginatedShows().query().$promise.then(onGetShowsListWithSuccess, deferred.reject);

    return deferred.promise;
  };

  this.getShownById = function getShownById(id) {
    var deferred = $q.defer();

     function onGetShowWithSuccess(response) {
      var shows = response;

      deferred.resolve(shows);
    }

    ShowFactory.getPaginatedShows().get({id: id}).$promise.then(onGetShowWithSuccess, deferred.reject);

    return deferred.promise;
  };
}

module.exports = ShowsListService;

'use strict';

/**
 * @ngInject
 */
function ShowsListService($q, ShowFactory, $log) {

  this.getPaginatedShowsList = function getPaginatedShowsList(pagination) {
    var deferred = $q.defer();
    pagination = typeof pagination !== 'undefined' ? pagination : 1;

    function onGetShowsListWithSuccess(response) {
      var shows = response;

      deferred.resolve(shows);
    }

    ShowFactory.getPaginatedShows().query({pagination: pagination}).$promise.then(onGetShowsListWithSuccess, deferred.reject);

    return deferred.promise;
  };

  this.getShowsList = function getShowsList() {
    var deferred = $q.defer();

    function onGetShowsListWithSuccess(response) {
      var shows = response;

      deferred.resolve(shows);
    }

    ShowFactory.getTopShows().query().$promise.then(onGetShowsListWithSuccess, deferred.reject);

    return deferred.promise;
  };

  this.getShowById = function getShowById(id) {
    var deferred = $q.defer();

     function onGetShowWithSuccess(response) {
      var shows = response;

      deferred.resolve(shows);
    }

    ShowFactory.getTopShows().get({id: id}).$promise.then(onGetShowWithSuccess, deferred.reject);

    return deferred.promise;
  };
}

module.exports = ShowsListService;

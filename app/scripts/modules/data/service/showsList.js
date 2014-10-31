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

  /*this.getBikeStationById = function getBikeStationById(id) {
    var deferred = $q.defer();

    function onGetAllBikesStations(stations) {
      stations.forEach(function (station) {
        if (id === station.id) {
          deferred.resolve(station);
        }
      });
    }

    this.getBikeStations().then(onGetAllBikesStations, deferred.reject);

    return deferred.promise;
  };*/
}

module.exports = ShowsListService;

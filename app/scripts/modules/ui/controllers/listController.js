'use strict';

/**
 * @ngInject
 */
function ListController($log, ShowsList, $stateParams) {
  // ViewModel
  var vm = this;

  vm.shows = [];
  ShowsList.getPaginatedShowsList($stateParams.pagination).then(function(shows) {
    vm.shows = shows;
    $log.log(shows);
  });
}

module.exports = ListController;

'use strict';

/**
 * @ngInject
 */
function DetailController($log, ShowsList, $stateParams) {
  // ViewModel
  var vm = this;

  vm.showDetail = [];
  ShowsList.getShownById($stateParams.id).then(function(showDetail) {
  	vm.showDetail = showDetail;
  	$log.log(showDetail);
  });

}

module.exports = DetailController;

'use strict';

/**
 * @ngInject
 */
function DetailController($log, showDetailFactory) {
  // ViewModel
  var vm = this;

  vm.showDetail = [];

  // On recupere le dernier et le prochain episode diffuse
  showDetailFactory.episodes_details.forEach(function(episode) {
    $log.log(episode);
  });

  vm.showDetail = showDetailFactory;

}

module.exports = DetailController;

'use strict';

/**
 * @ngInject
 */
function NavbarController($log, AuthService) {
  // ViewModel
  var vm = this;

  vm.logout = function() {
  	$log.log("pass inside");
  	AuthService.logout();
  }
  $log.log(vm);
}

module.exports = NavbarController;

'use strict';

/**
 * @ngInject
 */
function NavbarController($log, AuthService) {
  // ViewModel
  var vm = this;

  vm.logout = function() {
  	AuthService.logout();
  }
}

module.exports = NavbarController;

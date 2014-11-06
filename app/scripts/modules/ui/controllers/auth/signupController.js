'use strict';

/**
 * @ngInject
 */
function SignupController($log, AuthService) {
  // ViewModel
  var vm = this;

  vm.signup = function() {
  	$log.log(vm);
  	AuthService.signup({
  		email: vm.email,
  		password: vm.password
  	});
  }
}

module.exports = SignupController;

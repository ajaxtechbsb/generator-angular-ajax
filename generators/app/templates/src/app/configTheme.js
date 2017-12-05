(() => {
  'use strict'

  angular
  .module('app')
  .config(config);

  config.$inject = ['$mdThemingProvider', '$httpProvider'];

  function config ($mdThemingProvider, $httpProvider) {

    $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('cyan');
  }

})();

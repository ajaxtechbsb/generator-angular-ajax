(function () {
  'use strict';

  angular
    .module('routes', [])
    .config(routes);

  routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routes ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/homeRh');

    $stateProvider
      .state('homeRh', {
        url:      '/homeRh',
        template: '<home-rh/>'
      });
  }
}());

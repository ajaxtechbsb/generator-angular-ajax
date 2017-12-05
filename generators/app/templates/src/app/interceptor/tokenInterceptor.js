(() => {
  'use strict';

  angular
    .module('app')
    .factory('TokenInterceptor', TokenInterceptor);

  TokenInterceptor.$inject = ['$q', '$rootScope', 'ROUTE_BASE', '$localStorage', '$injector'];

  function TokenInterceptor($q, $rootScope, ROUTE_BASE, $localStorage, $injector){

    const status = {
      request: function (config){

        if(
          ($localStorage.access_token === undefined) &&
          (config.url !== './app/modules/login/templates/login.html')  &&
          (config.url !== 'http://localhost:8000/api/auth/login') &&
          (config.url !== 'GET')
        ){
          $injector.get('Toast').openToast('body', {
            message: 'Ops! Você ainda não logou.'
          });
          $injector.get('$state').transitionTo('login');
        }
        if(`${ROUTE_BASE}auth/login` !== config.url){
          config.headers.Authorization = $localStorage.access_token;
        }
        return config || $q.when(config)

      }
    }

    return status;
  }
})();

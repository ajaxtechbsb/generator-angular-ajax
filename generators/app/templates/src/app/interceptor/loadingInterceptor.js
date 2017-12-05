(() => {
  'use strict';

  angular
    .module('app')
    .factory('LoadingInterceptor', LoadingInterceptor);

  LoadingInterceptor.$inject = ['$q', '$rootScope'];

  function LoadingInterceptor($q, $rootScope){

    const status = {
      request: function (config){
        $rootScope.$broadcast("loading:show");
        return config || $q.when(config)
      },
      response: function (response) {
        $rootScope.$broadcast("loading:hide");
        return response || $q.when(response);
      },
      responseError: function (response){
        $rootScope.$broadcast("loading:hide");
        return $q.reject(response);
      }
    }

    return status;
  }
})();

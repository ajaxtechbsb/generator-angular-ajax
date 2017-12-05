(() => {

 'use strict';

var app = angular.module('app',[
  'ngMaterial',
  'ui.router',
  'ngMessages',
  'idf.br-filters',
  'ngStorage',
  'ui.utils.masks'
]);

app.config(($httpProvider) =>{
    $httpProvider.interceptors.push('LoadingInterceptor');
    $httpProvider.interceptors.push('TokenInterceptor');
    $httpProvider.interceptors.push('ErrorInterceptor');
});


app.run(($rootScope, $localStorage, $state)=>{

  $rootScope.logout = () => {
    delete $localStorage.access_token;
    delete $localStorage.user;
    $rootScope.user = '';
    $state.go('login');
  }


  if($localStorage.user !== undefined){
    $rootScope.user = $localStorage.user.name.split(" ");
  }

  $rootScope.$on('loading:show', function() {
    $rootScope.glassLoading = true;
  });

  $rootScope.$on('loading:hide', function() {
    $rootScope.glassLoading = false;
  });
})


})();

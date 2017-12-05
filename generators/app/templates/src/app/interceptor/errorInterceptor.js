(() => {
  'use strict';

  angular
    .module('app')
    .factory('ErrorInterceptor', ErrorInterceptor);

  ErrorInterceptor.$inject = ['$q', '$rootScope', 'ROUTE_BASE', '$injector'];

  function ErrorInterceptor($q, $rootScope, ROUTE_BASE, $injector){

    const status = {
      responseError: function (response){
        const message = createMessage(response);

        $injector.get('Toast').openToast('body', {
         message: 'Ops! ' + message
        });
        return $q.reject(response);
      }
    }

    return status;
  }

  function createMessage(response){
    let message = "Houve uma falha na conexão, verifique sua conexão"
    if(response.status === 401){
      switch(response.data.error){
        case "Invalid credentials":
          message = "Usuário inválido";
          break;
        case "Invalid password":
          message = "Senha inválida";
          break;
        default:
          message = "Sessão inválida, por favor logue novamente";
      }
    }
    if(response.status === 404){
      switch(response.data.error){
        case "Record not found":
          message = "Registro não localizado";
          break;
        default:
          message = "Rota incorreta";
      }
    }
    if(response.status === 501){
      switch(response.data.error){
        case "Email already exist!":
          message = "Email já existe";
          break;
        default:
          message = "Ainda não foi implementado";
      }
    }

    return message;
  }
})();

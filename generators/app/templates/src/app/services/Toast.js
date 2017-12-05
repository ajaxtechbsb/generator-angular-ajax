(() => {
  'use strict';

  angular
    .module('app')
    .service('Toast', toast);

  toast.$inject = ['$mdToast'];

  function toast ($mdToast) {

    this.openToast = (parentSelector, options) => {
      $mdToast.show({
        template:   getToast(options.message),
        hideDelay:  options.hideDelay || 3000
      });
    };

    function getToast (message) {
      return `
          <md-toast>
            <span flex md-colors="primary">
              ${message}
            </span>
          </md-toast>
      `;
    }
  }
})();

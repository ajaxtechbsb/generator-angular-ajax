'use strict';

const recursive = require('recursive-readdir');
const ENV = process.env.npm_lifecycle_event;

const removeAuthoziation = file => !file.includes('authorization');
const getJsSourceFiles = file => file.endsWith('.js') && !file.endsWith('.Spec.js');

const list = () => new Promise((resolve, reject) => {
  recursive('./src/app', (err, files) => {
    const arr = files
    .filter(file => {
        if (ENV === 'start') {
          return removeAuthoziation(file) && getJsSourceFiles(file);
        }
        return getJsSourceFiles(file);
      });

    err ? reject(err) : resolve(arr);
  });
});

const assets = [
  './src/bower_components/angular/angular.min.js',
  './src/bower_components/angular-material/angular-material.min.js',
  './src/bower_components/angular-animate/angular-animate.min.js',
  './src/bower_components/angular-messages/angular-messages.min.js',
  './src/bower_components/angular-aria/angular-aria.min.js',
  './src/bower_components/angular-ui-router/release/angular-ui-router.min.js',
  './src/bower_components/ngstorage/ngStorage.min.js',
  './src/bower_components/angular-locale-pt-br/angular-locale_pt-br.js',
  './src/bower_components/angular-input-masks/angular-input-masks-standalone.min.js',
  './src/bower_components/angular-br-filters/release/angular-br-filters.min.js'
];

module.exports = {
  assets,
  list
};

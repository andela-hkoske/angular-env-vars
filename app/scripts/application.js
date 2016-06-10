(function() {
  'use strict';
  // Sub-modules of the app
  angular.module('ngEnvVars.controllers', []);
  angular.module('ngEnvVars.services', []);
  angular.module('ngEnvVars.config', []);

  // Constants
  require('./config.js');

  // Services
  require('./services.js');

  // Controllers
  require('./controllers.js');

  // Definition of the ngEnvVars app and its dependencies
  window.app = angular.module('ngEnvVars', [
    'ngEnvVars.config',
    'ngEnvVars.controllers',
    'ngEnvVars.services',
    'ngMaterial'
  ]);
}());


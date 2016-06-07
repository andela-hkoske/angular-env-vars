angular.module('ngEnvVars.services')
  .factory('log', ['$log', 'ENV_VARS', '$mdToast',
    function($log, ENV_VARS, $mdToast) {
      return function(type, msg) {
        if (ENV_VARS.debug === "true") {
          if (type) {
            $log[type](msg);
            $mdToast.showSimple('Just printed a ' + type + ' message to the console');
          } else {
            $mdToast.showSimple('You have to specify a message type first');
          }
        } else {
          $mdToast.showSimple('This environment is not configured to log anything at this time');
        }
      };
    }
  ]);

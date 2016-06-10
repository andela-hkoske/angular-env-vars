angular.module('ngEnvVars.services')
  .factory('log', ['$log', 'ENV_VARS', '$mdToast',
    function($log, ENV_VARS, $mdToast) {
      /* Calling this service returns a function that takes in 
       * the type os a message and the message itself
       */
      return function(type, msg) {
        /* if debug has been set to true, logging will be enabled.
         * Otherwise, a toast will be shown telling the user that 
         * this feature is disabled for that particular environment
         */
        if (ENV_VARS.debug === true) {
          if (type) {
            $log[type](msg);
            $mdToast.showSimple('Just printed ' +
              ((/^[aeiou]/).test(type) ? 'an ' : 'a ') + type +
              ' message to the console');
          } else {
            $mdToast.showSimple('You have to specify' +
              ' a message type first');
          }
        } else {
          $mdToast.showSimple('This environment is not ' +
            'configured to log anything at this time');
        }
      };
    }
  ]);

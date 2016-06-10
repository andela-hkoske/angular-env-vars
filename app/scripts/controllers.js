angular.module('ngEnvVars.controllers')
  .controller('HomeCtrl', ['$scope', 'log', 'ENV_VARS',
    function($scope, log, ENV_VARS) {
      // This will contain our envars
      $scope.envVars = ENV_VARS;

      // This will log a message to the console
      $scope.log = function() {
        log($scope.logType, 'You have logged ' +
          ((/^[aeiou]/).test($scope.logType) ? 'an ' : 'a ') +
          $scope.logType + ' message to the console');
      };
    }
  ]);

angular.module('ngEnvVars.controllers')
  .controller('HomeCtrl', ['$scope', 'log', 'ENV_VARS', function($scope, log, ENV_VARS) {
    $scope.envVars = ENV_VARS;
    $scope.log = function() {
      log($scope.logType, 'You have logged a ' + $scope.logType + ' message to the console');
    };
  }]);


var app = require('../module');

app.controller('FirstCtrl', ['$scope', function ($scope) {
    $scope.test = true;
}]);
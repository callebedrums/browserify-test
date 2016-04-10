
require('angular-mocks');

describe('karma initial test', function () {

    var $scope;

    beforeEach(angular.mock.module('myModule'));

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        $controller('FirstCtrl', {$scope: $scope});
    }));

    it('test', function () {
        expect($scope.test).to.be.true;
    });
});
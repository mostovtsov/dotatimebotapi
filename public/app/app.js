function HearsListController($scope, $http) {
    $http.get('/hears').then(function successCallback(response) {
        $scope.hearsList = response.data;
    });

    $scope.getTextVariants = function (variantsArray) {
        return variantsArray.join(', ');
    };

    $scope.remove = function (hear) {
        $http.post('/remove', JSON.stringify(hear)).then(function successCallback(response) {
            console.log('Hear removed', response);
        });
    };

    $scope.add = function (hear) {
        $http.post('/add', JSON.stringify(hear)).then(function successCallback(response) {
            console.log('Hear added', response);
        });
    };

    $scope.edit = function (hear) {
        $http.post('/edit', JSON.stringify(hear)).then(function successCallback(response) {
            console.log('Hear updated', response);
        });
    };
};

var app = angular.module('hearsApp', [])
    .controller('HearsListController', ['$scope', '$http', HearsListController]);

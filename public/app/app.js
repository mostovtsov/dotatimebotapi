function HearsListController($scope, $http) {
    $http.get('/hears').then(function successCallback(response) {
        $scope.hearsList = response.data;
    });

    $scope.getTextVariants = function (variantsArray) {
        return variantsArray.join(', ');
    };
};

var app = angular.module('hearsApp', [])
    .controller('HearsListController', ['$scope', '$http', HearsListController]);
    
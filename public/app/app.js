function HearsListController($scope, $http) {
    
    $http.get('/hears').then(function successCallback(response) {
        $scope.hearsList = response.data;
    });
}

var app = angular.module('hearsApp', [])
    .controller('HearsListController', ['$scope', '$http', HearsListController]);



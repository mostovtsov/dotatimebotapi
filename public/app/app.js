function HearsListController($scope, $http, $uibModal) {
    var $ctrl = this;

    $ctrl.selectedHear = null;
    $http.get('/hears').then(function successCallback(response) {
        $scope.hearsList = response.data;
    });

    $scope.getTextVariants = function (variantsArray) {
        return variantsArray.join(', ');
    };

    $scope.remove = function (hear) {
        if (confirm("Are you sure?")) {
            $http.post('/remove', JSON.stringify(hear)).then(function successCallback(response) {
                console.log('Hear removed', response);
                //remove item from scope
                $scope.hearsList = _.without($scope.hearsList, _.findWhere($scope.hearsList, {
                    id: hear.id
                }));
            });
        }
    };

    $scope.add = function (hear) {
        $http.post('/add', JSON.stringify(hear)).then(function successCallback(response) {
            console.log('Hear added', response);
            $scope.hearsList.push(response.data);
        });
    };

    $scope.edit = function (hear) {
        $http.post('/edit', JSON.stringify(hear)).then(function successCallback(response) {
            console.log('Hear updated', response);
        });
    };

    $scope.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: function ($scope, $uibModalInstance) {
                $scope.ok = function () {
                    if ($scope.selectedHear) {

                    } else { //create new
                        var result = {
                            text: $scope.hearsText.split(","),
                            answer: $scope.answer
                        };
                    }
                    $uibModalInstance.close(result);
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                selectedHear: function () {
                    return $ctrl.selectedHear;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            //$ctrl.selectedHear = selectedItem;
            if (selectedItem) {
                $scope.add(selectedItem)
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }


};

var app = angular.module('hearsApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .controller('HearsListController', ['$scope', '$http', '$uibModal', HearsListController]);

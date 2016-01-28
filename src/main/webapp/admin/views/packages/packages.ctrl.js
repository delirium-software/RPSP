(function(){
    angular.module('adminApp')
        .controller('PackagesCtrl', ['$scope', 'RPSP', '$mdDialog', PackagesCtrl]);

    function PackagesCtrl($scope, RPSP, $mdDialog) {
        $scope.loading = true;
        $scope.showDialog=showDialog;
        $scope.items = [
                        { id: 1, name: 'Test_System_1' },
                        { id: 2, name: 'Test_System_2' },
                        { id: 3, name: 'Test_System_3' }
                      ];
        $scope.selectedItem = $scope.items[1];
        
        RPSP.settings().then(function (res) {
            $scope.config = res.data;
            $scope.loading = false;
        })
        
        
        function showDialog($event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                templateUrl: 'views/packages/newPackageDialog.html',
                locals: {
                    items: $scope.items
                },
                controller: DialogController
            });
            function DialogController($scope, $mdDialog, items) {
                $scope.items = items;
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }
            }
        }

    }
})()

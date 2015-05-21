(function(){
    'use strict';

    function SelectionResultController($location, $mdBottomSheet, selectionService){
        var vm = this;
        vm.meals = selectionService.meals;
        vm.loading = false;

        vm.showBottomSheet = function() {
            $mdBottomSheet.show({
                templateUrl: 'app/selection/bottom-sheet-result.html',
                controller: 'BottomSheetController'
            }).then(function(clickedItem) {
                if(clickedItem == "Back"){
                    $location.path('/selection');
                }
                else if(clickedItem == "Refresh"){
                    vm.loading = true;
                    selectionService.retrieve().then(function(){
                        vm.meals = selectionService.meals;
                        vm.loading = false;
                    });
                }
                else if(clickedItem == "Groceries"){

                }
            });
        }
    }

    window.angular.module('app').controller('SelectionResultController', SelectionResultController);
})();
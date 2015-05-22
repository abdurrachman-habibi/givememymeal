(function () {
    'use strict';

    function SelectionResultController($location, $mdBottomSheet, $mdDialog, selectionService) {
        var vm = this;
        vm.meals = selectionService.meals;
        vm.loading = false;

        vm.showBottomSheet = function () {
            $mdBottomSheet.show({
                templateUrl: 'app/selection/bottom-sheet-result.html',
                controller: 'BottomSheetController'
            }).then(function (clickedItem) {
                if (clickedItem == "Back") {
                    $location.path('/selection');
                }
                else if (clickedItem == "Refresh") {
                    vm.loading = true;
                    selectionService.retrieve().then(function () {
                        vm.meals = selectionService.meals;
                        vm.loading = false;
                    });
                }
                else if (clickedItem == "Groceries") {
                    var content = '';
                    for (var prop in selectionService.groceries) {
                        if (selectionService.groceries.hasOwnProperty(prop)) {
                            var item = prop + ": " + selectionService.groceries[prop];
                            content += item + ', ';
                        }
                    }
                    //$mdDialog.show(
                    //    $mdDialog.alert()
                    //        .title('Here is your groceries list for the next week')
                    //        .content(content)
                    //        .ok('Got it!')
                    //);

                    $mdDialog.show({
                        controller: function () {
                            this.hide = function () {
                                $mdDialog.hide();
                            };
                            return this;
                        },
                        controllerAs: 'dialog',
                        templateUrl: 'groceries.detail.html',
                        locals: { groceries: selectionService.groceries },
                        bindToController: true
                    });
                }
            });
        };

        vm.showMeal = function (data) {
            $mdDialog.show({
                controller: function () {
                    this.hide = function () {
                        $mdDialog.hide();
                    };
                    return this;
                },
                controllerAs: 'dialog',
                templateUrl: 'meal.detail.html',
                locals: { mealSelected: data },
                bindToController: true
            });
        }
    }

    window.angular.module('app').controller('SelectionResultController', SelectionResultController);
})();
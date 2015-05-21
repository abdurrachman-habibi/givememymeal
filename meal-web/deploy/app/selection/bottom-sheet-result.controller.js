(function(){

    function BottomSheetController($mdBottomSheet, $scope){
        $scope.items = [
            { name: 'Back', icon: 'fa-arrow-circle-left' },
            { name: 'Refresh', icon: 'fa-refresh' },
            { name: 'Groceries', icon: 'fa-shopping-cart' }
        ];
        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index].name;
            $mdBottomSheet.hide(clickedItem);
        };
    }

    window.angular.module('app').controller('BottomSheetController', BottomSheetController);
})();
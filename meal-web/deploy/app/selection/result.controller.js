(function(){
    'use strict';

    function SelectionResultController($location, selectionService){
        this.meals = selectionService.meals;

        this.back = function () {
            $location.path('/selection');
        }
    }

    window.angular.module('app').controller('SelectionResultController', SelectionResultController);
})();
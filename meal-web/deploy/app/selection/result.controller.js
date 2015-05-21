(function(){
    'use strict';

    function SelectionResultController($location, selectionService){
        this.meals = selectionService.meals;
    }

    window.angular.module('app').controller('SelectionResultController', SelectionResultController);
})();
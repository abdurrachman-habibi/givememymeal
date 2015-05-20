(function(){
    'use strict';

    function SelectionResultController($location, selectionService){
        this.meals = selectionService.data;
    }

    window.angular.module('app').controller('SelectionResultController', SelectionResultController);
})();
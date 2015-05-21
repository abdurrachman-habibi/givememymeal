(function(){
    'use strict';

    window.angular.module('app').controller('SelectionController', SelectionController);

    SelectionController.$inject = ['$location', 'selectionService'];

    function SelectionController($location, selectionService) {

        var vm = this;

        vm.showbmi = false;
        vm.vegetarian = 1;

        //vm.height = 170;
        //vm.weight = 62;
        //vm.gender = 1;
        //vm.age = 29;
        //vm.showbmi = true;

        vm.calculateBMI = function () {
            
            if (!(vm.height === undefined || vm.weight === undefined || vm.gender === undefined || vm.age === undefined))
                vm.showbmi = true;
            else 
                vm.showbmi = false;
            
            if (vm.showbmi) {
                vm.bmi = vm.weight / ((vm.height / 100) * (vm.height / 100));

                var computekcalperday = (10 * vm.weight) + (6.25 * vm.height) - (5 * vm.age);

                if (vm.gender == 1)
                    computekcalperday = computekcalperday + 5;
                else
                    computekcalperday = computekcalperday - 161;

                vm.kcalperday = computekcalperday;
            }
        };

        vm.submit = function () {
            
            selectionService.retrieve(vm.vegetarian, vm.kcalperday).then(function(){
                $location.path('/selection-result');
            });
        }
    }
})();
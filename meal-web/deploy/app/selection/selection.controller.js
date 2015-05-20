(function(){
    'use strict';

    window.angular.module('app').controller('SelectionController', SelectionController);

    SelectionController.$inject = ['$location'];

    function SelectionController($location) {

        var vm = this;

        vm.showbmi = false;

        vm.calculateBMI = function () {
            
            if (!(vm.height === undefined || vm.weight === undefined || vm.gender === undefined))
                vm.showbmi = true;
            else {
                vm.showbmi = false;
            }

            if (vm.showbmi) {
                vm.bmi = vm.weight / (vm.height / 100);

                var computekcalperday = (10 * vm.weight) + (6.25 * vm.height) - (5 * vm.age);

                if (vm.gender == 1)
                    computekcalperday = computekcalperday + 5;
                else
                    computekcalperday = computekcalperday - 161;

                vm.kcalperday = computekcalperday;
            }
        };
    }
})();
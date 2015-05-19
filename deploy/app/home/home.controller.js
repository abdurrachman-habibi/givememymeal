(function(){
    'use strict';

    function HomeController($location){

        function goToSelection(){
            $location.path('/selection');
        }

        var vm = this;
        vm.goToSelection = goToSelection;
    }

    window.angular.module('app').controller('HomeController', HomeController);
    HomeController.$inject = ['$location'];
})();
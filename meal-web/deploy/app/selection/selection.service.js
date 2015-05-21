(function(){
    'use strict';

    function selectionService($http){
        var lastPreference = '';
        var lastCalories = '';

        function retrieve(preference, calories){
            preference = preference || lastPreference;
            calories = calories || lastCalories;
            var api = 'http://meal-api.azurewebsites.net/api/meals?';
            api += 'key=' + preference;
            api+= '&cal=' + calories;

            return $http.get(api).success(function(data){
                lastPreference = preference;
                lastCalories = calories;
                service.meals = data.meals;
            });
        }

        var service ={
            meals: [],
            groceries: {},
            retrieve: retrieve
        };

        return service;
    }

    window.angular.module('app').factory('selectionService', selectionService);
    selectionService.$inject = ['$http'];
})();
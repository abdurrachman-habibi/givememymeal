(function(){
    'use strict';

    function selectionService($http){

        function retrieve(preference, calories){
            var api = 'http://meal-api.azurewebsites.net/api/meals?';
            api += 'key=' + preference;
            api+= '&cal=' + calories;

            return $http.get(api).success(function(data){
                service.data = data;
            });
        }

        var service ={
            data: [],
            retrieve: retrieve
        };

        return service;
    }

    window.angular.module('app').factory('selectionService', selectionService);
    selectionService.$inject = ['$http'];
})();
(function(){
    var app = angular.module('app', ['ngTouch', 'ngMaterial', 'ngResource', 'ngRoute', 'ngSanitize', 'LocalStorageModule']);

    app.run(['$route', function($route){

    }]);

    app.config(['$locationProvider', '$routeProvider', 'routes', function($locationProvider, $routeProvider, routes){
        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.configuration);
        });

        $routeProvider.otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(false);
    }]);

    var constantRoutes = [
        {
            url: '/',
            configuration: {
                templateUrl: 'app/home/home.html',
                controller: 'HomeController',
                controllerAs: 'home'
            }
        },{
            url: '/selection',
            configuration: {
                templateUrl: 'app/selection/selection.html',
                controller: 'SelectionController',
                controllerAs: 'selection'
            }
        }
    ];

    app.constant('routes', constantRoutes);
})();
"use strict";

module.exports = ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/app/dash');

    $stateProvider
        .state('app', {
            url: "/app",
            abstruct: true,
            templateUrl: "templates/app.tpl.html",
        })
        .state('app.dash', {
            url: "/dash",
            templateUrl: "templates/dash.tpl",
            controller: 'DashCtrl'
        })
}]

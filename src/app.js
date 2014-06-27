var app = angular.module('Reception', ['ui.router', 'cgBusy', 'ui.bootstrap']);

app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/users");
    //
    // Now set up the states
    $stateProvider
        .state('users', {
            url: "/users",
            templateUrl: "partials/users.html"
        })
        .state('users.id', {
            url: "/users/:id",
            templateUrl: "partials/users.html"
        })
        .state('workCalendar', {
            url: "/workCalendar",
            templateUrl: "partials/workCalendar.html"
        })
});
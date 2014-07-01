var app = angular.module('Reception', ['ui.router', 'cgBusy', 'ui.bootstrap']);

app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/users/1");
    //
    // Now set up the states
    $stateProvider
        .state('users', {
            url: "/users/:pageNum",
            templateUrl: "partials/users.html",
            controller: function($scope, $stateParams) {
                $scope.pageNum = parseInt($stateParams.pageNum);
            }
        })
        .state('workCalendar', {
            url: "/workCalendar",
            templateUrl: "partials/workCalendar.html"
        })
});
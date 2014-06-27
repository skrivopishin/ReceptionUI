app.controller('WorkCalendarController', function ($scope, $http, $q) {
    function parseMinutes(x) {
        var hours = Math.floor(x / 60);
        var minutes = x % 60;
        var hoursText = hours === 0 ? "" : (hours + "h : ");
        return hoursText + minutes + "m"
    }

    var today = new Date();
    var weekstart = today.getDate() - today.getDay() +1;
    var weekend = weekstart + 6;
    var monday = new Date(today.setDate(weekstart));
    var sunday = new Date(today.setDate(weekend));
    var dateFrom = (monday.getMonth()+1)+'/'+monday.getDate()+'/'+monday.getFullYear();
    var dateTo = (sunday.getMonth()+1)+'/'+sunday.getDate()+'/'+sunday.getFullYear();
    $scope.loadingPromise = $http.get('http://localhost/api/get/events?datefrom='+dateFrom+'&dateto='+dateTo);
    $scope.loadingPromise.then(function (response) {
        var eventsData = response.data;
        _.forEach(eventsData.users, function (user) {
            user.formattedWorkTime = [];
            _.forEach(user.workInMinutes, function (minutes) {
                user.formattedWorkTime.push(parseMinutes(minutes));
            })
        });
        $scope.events = eventsData;
    }, function (reason) {
        $scope.error = reason;
    });

    $scope.loadingPromise = $http.get('http://localhost/api/get/alldates').then(function (response) {
        var allDates = response.data;
        console.log(response.data);
        $scope.minDate = new Date(allDates[0]);
        $scope.maxDate = new Date(allDates[allDates.length]);
        $scope.dtFrom.setStartDate($scope.minDate);
    });

    $scope.reload = function (dateFrom, dateTo) {
        $scope.loadingPromise = $http.get('http://localhost/api/get/events?datefrom='+dateFrom+'&dateto='+dateTo);
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.openFrom = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedFrom = true;
    };

    $scope.openTo = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedTo = true;
    };



    $scope.initDate = new Date();
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];

});
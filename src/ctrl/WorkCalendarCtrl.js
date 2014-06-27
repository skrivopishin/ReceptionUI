app.controller('WorkCalendarController', function ($scope, $http, $q) {
    function parseMinutes(x) {
        var hours = Math.floor(x / 60);
        var minutes = x % 60;
        var hoursText = hours === 0 ? "" : (hours + "h : ");
        return hoursText + minutes + "m"
    }

    $scope.reload = function (dateFrom, dateTo) {
        var _dateFrom = (dateFrom.getMonth()+1)+'/'+dateFrom.getDate()+'/'+dateFrom.getFullYear();
        var _dateTo = (dateTo.getMonth()+1)+'/'+dateTo.getDate()+'/'+dateTo.getFullYear();
        $scope.loadingPromise = $http.get('http://localhost/api/get/events?datefrom='+_dateFrom+'&dateto='+_dateTo);
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
    };

    $scope.loadingPromise = $http.get('http://localhost/api/get/alldates').then(function (response) {
        var allDates = response.data;
        console.log(response.data);
        $scope.dtFrom = new Date(allDates[0]);
        $scope.dtTo = new Date(allDates[6]);
        $scope.dtFromMin = new Date(allDates[0]);
        $scope.dtToMin = new Date(allDates[1]);
        $scope.dtFromMax = new Date(allDates[allDates.length-1]);
        $scope.dtToMax = new Date(allDates[allDates.length]);
        $scope.reload($scope.dtFrom, $scope.dtTo);
    });

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

    $scope.changedTo = function() {
        var dt = $scope.dtTo;
      $scope.dtFromMax = new Date((dt.getMonth() + 1) + '/' + (dt.getDate() - 1) + '/' + dt.getFullYear());
    };

    $scope.changedFrom = function() {
        var dt = $scope.dtFrom;
        $scope.dtToMin = new Date((dt.getMonth() + 1) + '/' + (dt.getDate() + 1) + '/' + dt.getFullYear());
    };

    $scope.initDate = new Date();
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[3];

});
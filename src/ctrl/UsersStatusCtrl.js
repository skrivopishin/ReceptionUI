app.controller('UsersStatusController', function ($scope, $http, $state) {
    var DEFAULT_PAGE_SIZE = 10;
    $scope.pages = [];
    $scope.pageSize = $state.params.pageSize || DEFAULT_PAGE_SIZE;
    $scope.pageNum = parseInt($state.params.pageNum) || 1;
    if ($scope.pageNum <= 0) {
        $scope.pageNum = 1;
    }

    var processUsersData = function (users) {
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            user.currentLocation = user.LastLoginReaderID == 1 ? "Out of office" : "In office";
        }
    };

    $scope.loadData = function (pageNum, pageSize) {
        $http.get('http://localhost/api/get/users').success(function (data) {
            var totalPages = Math.ceil(data.length / pageSize);
            if ($scope.pageNum > totalPages) {
                $scope.pageNum = 1;
                return;
            }
            processUsersData(data);
            for (var i = 1; i <= totalPages; i++) {
                $scope.pages.push(i);
            }
            $scope.users = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
        }, function (reason) {
            $scope.error = reason;
        });
    };

    $scope.loadData($scope.pageNum, $scope.pageSize);

    $scope.setPage = function (pageNum) {
        if (pageNum <= 0 || pageNum > $scope.pages.length) return;
        $scope.pageNum = pageNum;
    };

    $scope.$watch('pageNum', function (newValue, previousValue) {
        if (newValue == previousValue) return;
        console.log('pageNum changed from ' + previousValue + ' to: ' + newValue);
        var toParams = {pageNum: $scope.pageNum };
        if ($scope.pageSize && $scope.pageSize != DEFAULT_PAGE_SIZE) {
            toParams = $scope.pageSize;
        }
        $state.transitionTo('users', toParams);
    });

});

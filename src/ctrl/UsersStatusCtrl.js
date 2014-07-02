app.controller('UsersStatusController', function ($scope, $http, $q) {
    var processUsersData = function (users) {
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            user.currentLocation = user.LastLoginReaderID == 1 ? "Out of office" : "In office";
        }
    };
    $scope.pages = [];
    $scope.pageSize = 18;
    $scope.loadData = function () {
        $http.get('http://localhost/api/get/users').success(function (data) {
            processUsersData(data);
            $scope.users = data;
        }, function (reason) {
            $scope.error = reason;
        });
    };

    $scope.loadData();

    $scope.orderByField = 'LastName';
    $scope.reverseSort = false;
});

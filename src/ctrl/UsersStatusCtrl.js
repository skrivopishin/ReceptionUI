app.controller('UsersStatusController', function ($scope, $http) {

    var processUsersData = function (users) {
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            user.currentLocation = user.LastLoginReaderID == 1 ? "Out of office" : "In office";
        }
    };

    $http.get('http://localhost/api/get/users').success(function (data) {
        processUsersData(data);
        $scope.users = data;
    }, function (reason) {
        $scope.error = reason;
    });
});

app.controller('UsersStatusController', function ($scope, $http) {
    var processUsersData = function (users) {
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            user.currentLocation = user.LastLoginReaderID == 1 ? "Out of office" : "In office";
        }
    };
    $scope.pages = [];
    $scope.pageSize = 18;
    $scope.loadData = function (pageNum, pageSize) {
        $http.get('http://localhost/api/get/users').success(function (data) {
            processUsersData(data);
            for (var i = 1; i <= Math.ceil(data.length/pageSize); i++)
            {
                $scope.pages.push(i);
            }
            $scope.users = data.slice((pageNum-1)*pageSize,pageNum*pageSize);
        }, function (reason) {
            $scope.error = reason;
        });
    };

    $scope.loadData($scope.pageNum,$scope.pageSize);

});

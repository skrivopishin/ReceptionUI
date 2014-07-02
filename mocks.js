var appMocked = angular.module('ReceptionMock', ['Reception', 'ngMockE2E']);

appMocked.run(function ($httpBackend, mocks) {
    $httpBackend.whenGET('http://localhost/api/get/users').respond(mocks.users);
    $httpBackend.whenGET('/api/get/alldates').respond(mocks.usersData);
    $httpBackend.whenGET(/\.html$/).passThrough();
});

appMocked.service('mocks', function () {
    var generatedUsers = [];
    for (var i = 0; i < 300; i++) {
        var lastLoginReaderId = i % 2 ? 1 : 1001;
        var user = {UserID: i, FirstName: 'Mister', LastName: i, Name: 'name' + i, LastLoginReaderID: lastLoginReaderId};
        generatedUsers.push(user);
    }
    return {
        users: generatedUsers,
        usersData:  {
            dates: ['06/24/2014', '06/25/2014', '06/26/2014', '06/27/2014', '06/28/2014'],
            worktime: [
                { name: 'starmonkey', time: ['8', '8', '8', '8', '8' ] },
                { name: 'antik', time: ['2', '', '3', '', '1' ] },
                { name: 'lk', time: [ '', '14', '', '23', '' ] }
            ]
        }
    }
});
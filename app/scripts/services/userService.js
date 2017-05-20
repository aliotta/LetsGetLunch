(function () {

    function UserService(ApiCalls) {

        var service = {
            getLunchGroups: getLunchGroups
        };

        function getLunchGroups(url, type, data) {
            return ApiCalls.doApiCall('user/random', 'GET')
            .then(function(res){
                service.lunchGroups = res.data;
            });
        }

        return service;

    }

    UserService.$inject = ['ApiCalls'];

    angular
    .module('appartmentListLunchApp')
    .factory('UserService', UserService);

}());
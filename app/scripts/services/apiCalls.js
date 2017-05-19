(function () {

    function ApiCalls($http, $location) {

        var service = {
            doPromiseCall: doPromiseCall
        };


        function doPromiseCall(url, type, data) {
            var headersObj = {};
            if (url.charAt(0) !== '/') {
                url = '/' + url;
            }

            var config = {
                url: url,
                method: type,
                data: data
            };

            return $http(config)
            .catch(function(err) {
                console.log('error', err);
            });
        }

        return service;

    }

    ApiCalls.$inject = ['$http', '$location'];

    angular
    .module('appartmentListLunchAppApp')
    .factory('ApiCalls', ApiCalls);

}());
(function () {

    function ApiCalls($http, $location) {

        var service = {
            doApiCall: doApiCall
        };

        function doApiCall(url, type, data) {
            var headersObj = {};
            if (url.charAt(0) !== '/') {
                url = '/' + url;
            }

            var config = {
                url: url,
                method: type,
                data: data
            };

            return $http(config);
        }

        return service;

    }

    ApiCalls.$inject = ['$http', '$location'];

    angular
    .module('appartmentListLunchApp')
    .factory('ApiCalls', ApiCalls);

}());
(function () {
    function config($locationProvider) {
        $locationProvider
            .html5Mode({ //hashBang URLs are disabled
                enabled: true,
                requireBase: false
            });


    };





    angular
        .module('blocTime', ['firebase', 'ui.router'])
        .config(config)
        .constant('STOP_WATCH', {
            "totalWorkTime": 5,
            "totalBreakTime": 3,
            "totalLongBreakTime": 4,
            "defaultWorkTime": 5,
            "defaultBreakTime": 3,
            "defaultLongBreakTime": 4
        });
})();

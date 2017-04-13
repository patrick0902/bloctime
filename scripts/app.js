(function() {
  function config($locationProvider) {
    $locationProvider
        .html5Mode({ //hashBang URLs are disabled
        enabled: true,
        requireBase: false
    });
  }

  function Tasks($firebaseArray) {
    var ref = firebase.database().ref();

    //download tasks into a synchronized array
    var tasks = $firebaseArray(ref);
    console.log(tasks);

    return {
      all: tasks
    }
  }








    angular
        .module('blocTime', ['firebase', 'ui.router'])
        .config(config)
        .factory('Tasks', ['$firebaseArray', Tasks])
        .constant('STOP_WATCH', {
          "totalWorkTime": 5,
          "totalBreakTime": 3,
          "totalLongBreakTime": 4,
          "defaultWorkTime": 5,
          "defaultBreakTime": 3,
          "defaultLongBreakTime": 4
        });
})();
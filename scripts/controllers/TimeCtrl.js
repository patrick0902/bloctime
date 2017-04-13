(function() {

  function TimerCtrl(clockTimer) {
    this.clockTimer = clockTimer;
  };

  angular
    .module('blocTime')
    .controller('TimerCtrl', [clockTimer, TimerCtrl]);
});
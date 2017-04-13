(function () {
    function clockTimer($interval, $window, STOP_WATCH) {
        return {
            templateUrl: '/templates/directives/clock_timer.html',
            replace: true,
            restrict: 'E',
            scope: {},
            link: function (scope, element, attributes) {

                scope.STOP_WATCH = STOP_WATCH; //see constants in app.js
                scope.startButton = 'Start Work';
                scope.breakButton = 'Take Break';
                //boolean for alternating displaying of work-time or break
                scope.onBreak = false;

                // @desc Holds state for $interval call
                var promise;

                /**
                 * @desc counts down the working time clock
                 * @function
                 */
                var workCountdown = function () {
                    if (scope.STOP_WATCH.workTime > 0) {
                        scope.STOP_WATCH.workTime--;
                    } else if (scope.STOP_WATCH.workTime === 0) {
                        scope.onBreak = true;
                        scope.stop();
                        scope.startButton = 'Start Work';
                        scope.STOP_WATCH.workTime = scope.STOP_WATCH.defaultWorkTime;
                    }
                };

                // function countDown(time) {
                //   if (time > 0) {
                //     console.log(time);
                //     time--;
                //   } else if (time === 0) {
                //     scope.onBreak = (onBreak === true) ? false : true;
                //     defaultAll();
                //   }
                // };
                //
                // var defaultAll = function() {
                //   scope.stop();
                //   scope.startButton = 'Start Work';
                //   scope.breakButton = 'Take Break';
                //   scope.STOP_WATCH.workTime = scope.STOP_WATCH.defaultWorkTime;
                //   scope.STOP_WATCH.breakTime = scope.STOP_WATCH.defaultBreakTime;
                // };

                var breakCountdown = function () {
                    if (scope.STOP_WATCH.breakTime > 0) {
                        scope.STOP_WATCH.breakTime--;
                    } else if (scope.STOP_WATCH.breakTime === 0) {
                        scope.onBreak = false;
                        scope.stop();
                        scope.breakButton = 'Take Break';
                        scope.STOP_WATCH.breakTime = scope.STOP_WATCH.defaultBreakTime;
                    }
                }

                scope.stop = function () {
                    $interval.cancel(promise);
                }

                scope.startStopButton = function (startButton) {

                    //clockStarts
                    scope.startButton = (startButton === 'Start Work') ? 'Stop' : 'Start Work';
                    if (scope.startButton === 'Stop') {
                        promise = $interval(workCountdown, 1000);
                    } else if (scope.startButton === 'Start Work') {
                        $window.alert("Your Working Time Has Reset")
                        scope.stop();
                        scope.STOP_WATCH.workTime = scope.STOP_WATCH.defaultWorkTime;
                    }
                };




                scope.takeBreakButton = function (breakButton) {
                    //clockStarts
                    scope.breakButton = (breakButton === 'Take Break') ? 'Break In Session' : 'Take Break';
                    if (scope.breakButton === 'Break In Session') {
                        promise = $interval(breakCountdown, 1000);
                    } else if (scope.breakButton === 'Take Break') {
                        $window.alert("Your Working Time Is To Important.  Please Wait")
                    }
                };

            }
        }
    };

    angular
        .module('blocTime')
        .directive('clockTimer', clockTimer);


})();

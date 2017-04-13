(function () {
    function clockTimer($interval, $window, STOP_WATCH, Tasks) {

        return {
            templateUrl: '/templates/directives/clock_timer.html',
            replace: true,
            restrict: 'E',
            scope: {},
            link: function (scope, element, attributes) {
                scope.tasks = Tasks.all;
                scope.STOP_WATCH = STOP_WATCH;
                scope.startButton = 'Start Work';
                scope.breakButton = 'Take Break';
                scope.onBreak = false;
                var mySound = new buzz.sound("assets/sounds/elevatorDing.mp3", {
                    preload: true
                });


                var completedWorkSessions = 0;

                var promise;

                scope.$watch('STOP_WATCH.totalWorkTime', function () {
                    if (scope.STOP_WATCH.totalWorkTime === 0) {
                        mySound.play();
                        console.log(mySound);
                        console.log("im listening");
                    }
                });

                scope.$watch('STOP_WATCH.totalBreakTime', function () {
                    if (scope.STOP_WATCH.totalBreakTime === 0) {
                        mySound.play();
                        console.log(mySound);
                        console.log("im listening");
                    }
                });

                scope.addTask = function (addedTask) {
                    addedTask = Tasks.all.$add(addedTask);
                    console.log("task" + addedTask + "entered");
                }


                var workCountdown = function () {
                    if (scope.STOP_WATCH.totalWorkTime > 0) {
                        scope.STOP_WATCH.totalWorkTime--;
                    } else if (scope.STOP_WATCH.totalWorkTime === 0) {
                        scope.onBreak = true;
                        scope.stop();
                        scope.startButton = 'Start Work';
                        scope.STOP_WATCH.totalWorkTime = scope.STOP_WATCH.defaultWorkTime;
                        completedWorkSessions++;
                        if (completedWorkSessions % 4 === 0) {
                            scope.STOP_WATCH.totalBreakTime = scope.STOP_WATCH.defaultLongBreakTime;
                            scope.breakButton = 'Take Long Break';
                        }
                        console.log(completedWorkSessions);
                    }
                };

                var breakCountdown = function () {
                    if (scope.STOP_WATCH.totalBreakTime > 0) {
                        scope.STOP_WATCH.totalBreakTime--;
                    } else if (scope.STOP_WATCH.totalBreakTime === 0) {
                        scope.onBreak = false;
                        scope.stop();
                        scope.breakButton = 'Take Break';
                        scope.STOP_WATCH.totalBreakTime = scope.STOP_WATCH.defaultBreakTime;
                    }
                }


                scope.stop = function () {
                    $interval.cancel(promise);
                }

                scope.startStopButton = function (startButton) {

                    scope.startButton = (startButton === 'Start Work') ? 'Stop' : 'Start Work';
                    if (scope.startButton === 'Stop') {
                        promise = $interval(workCountdown, 1000);
                    } else if (scope.startButton === 'Start Work') {
                        $window.alert("Your Working Time Has Reset")
                        scope.stop();
                        scope.STOP_WATCH.totalWorkTime = scope.STOP_WATCH.defaultWorkTime;
                    }
                };




                scope.takeBreakButton = function (breakButton) {

                    if (scope.breakButton === 'Take Long Break') {
                        scope.breakButton = (breakButton === 'Take Long Break') ? 'Break In Session' : 'Take Long Break';
                        if (scope.breakButton === 'Break In Session') {
                            promise = $interval(breakCountdown, 1000);
                        } else if (scope.breakButton === 'Take Long Break') {
                            $window.alert("Your Working Time Is To Important.  Please Wait")
                        }
                    } else if (scope.breakButton === 'Take Break') {
                        scope.breakButton = (breakButton === 'Take Break') ? 'Break In Session' : 'Take Break';
                        if (scope.breakButton === 'Break In Session') {
                            promise = $interval(breakCountdown, 1000);
                        } else if (scope.breakButton === 'Take Break') {
                            $window.alert("Your Working Time Is To Important.  Please Wait")
                        }
                    }
                };

            }
        }
    };

    angular
        .module('blocTime')
        .directive('clockTimer', clockTimer);


})();

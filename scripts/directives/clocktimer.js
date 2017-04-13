(function() {
   function clockTimer($interval) {
 
     return {
       templateUrl: '/templates/directives/clock_timer.html',
       replace: true,
       restrict: 'E',
       scope: {},
       link: function(scope, element, attributes) {
 
 
         scope.startButton = 'Start';
         scope.breakButton = 'Break';
         scope.defaultClock = 2500;
         var promise;
 
         var countdown = function() {
           scope.defaultClock--;
         };
 
         scope.stop = function() {
           $interval.cancel(promise);
         }
 
         scope.startStopTimer = function(startButton) {
 
           //clockStarts
           scope.startButton = (startButton === 'Start') ? 'Stop' : 'Start';
             if (scope.startButton === 'Stop') {
               promise = $interval(countdown, 1000);
             } else if (scope.startButton === 'Start') {
               scope.stop();
               scope.defaultClock = 2500;
             }
         };
 
 
 
 
             scope.breakTime = function() {
               return scope.breakButton;
             };
 
       }
     }
   };
 
   angular
     .module('blocTime')
     .directive('clockTimer', clockTimer);
 
 
 })();
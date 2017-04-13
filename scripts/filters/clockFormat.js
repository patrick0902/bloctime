(function() {
  function clockFormat() {  //filter function must return another function which takes at least on argument, the input filter
    return function(seconds) {

      var output = buzz.toTimer(seconds);

      if (Number.isNaN(seconds)) {
        return '25:00';
      }
      
      return output;
    };
  };

  angular
    .module('blocTime')
    .filter('clockFormat', clockFormat);
})();
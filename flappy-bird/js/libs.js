/*================================================================
  #LOG
  ================================================================*/

// singleton
// 
// console.log(a); // normal
// console.info(a); // stage
// console.debug(a); // var
// console.warn(a);
// console.error(a); // error
var PHLog = (function() {
  var instance = null;

  function init() {
    var id = 0;
    var isShowlog = true; // unused
    var isShowInfo = true; // unused
    var isShowWarn = true; // unused
    var isShowErr = true; // unused

    return {
      getId: function() {
        return id;
      },
      log: function(a) {
        console.log(id++, a);
      },
      logNoId: function(a) {
        console.log(a);
      },
      info: function(a) {
        console.info(id++, a);
      },
      debug: function(a) {
        console.debug(id++, a);
      },
      warn: function(a) {
        console.warn(id++, a);
      },
      err: function(a) {
        console.error(id++, a);
      }
    }
  }

  return {
    getInstance: function() {
      if (! instance) {
        instance = init();
      }

      return instance;
    }
  }
})();

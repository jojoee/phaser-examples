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
      infoNoId: function(a) {
        console.info(a);
      },
      debug: function(a) {
        console.debug(id++, a);
      },
      debugNoId: function(a) {
        console.debug(a);
      },
      warn: function(a) {
        console.warn(id++, a);
      },
      warnNoId: function(a) {
        console.warn(a);
      },
      err: function(a) {
        console.error(id++, a);
      },
      err: function(a) {
        console.error(a);
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

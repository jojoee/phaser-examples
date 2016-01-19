/*================================================================
  #SHARE
  ================================================================*/

var PHShare = (function() {
  var instance = null;

  function init() {
    return {
      // http://www.html5gamedevs.com/topic/6970-phaser-js-share-score-on-twitter/
      tweet: function(msg) {
        if (!msg) msg = 'Try this';

        // share score on twitter
        var tweettxt = msg + ' - ' + window.location.href;
        var tweetbegin = 'http://twitter.com/home?status=';
        var finaltweet = tweetbegin + encodeURIComponent(tweettxt);
        window.open(finaltweet,'_blank');
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

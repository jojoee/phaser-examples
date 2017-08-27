var webshot = require('webshot');
var gameFilePath = './games/games.js';

// HACK
// import file
// http://stackoverflow.com/questions/4662851/how-do-you-import-non-node-js-files
eval(require('fs').readFileSync(gameFilePath, 'utf8'));

var screenshotFolderPath = './screenshots',
  devPath = 'http://localhost:3000/games',
  nGames = games.length;

/* ================================================================ Screenshot
 */

var webshotOption = {
  renderDelay: 1000
};

/**
 * [fireWebshotByIndex description]
 *
 * @example fireWebshotByIndex(0);
 * @example fireWebshotByIndex(3);
 * @example fireWebshotByIndex(nGames - 1);
 *
 * @param {number} idx
 */
function fireWebshotByIndex(idx) {
  var gameId = games[idx].id;

  if (gameId) {
    var gameUrl = devPath + '/' + gameId,
      screenshotFilePath = screenshotFolderPath + '/' + gameId + '.jpg';

    webshot(gameUrl, screenshotFilePath, webshotOption, function(err) {
      console.log('i: ' + i + ', ' + gameId + '\'s screenshot has been saved to ' + screenshotFilePath);

      if (err) {
        console.log('================ ERROR: webshot is error');
        console.log(err);
      }
    });
  } else {
    console.log('================ ERROR: gameId is undefined (i: ' + i + ')');
  }
}

/**
 * [fireWebshot description]
 * quite duplicate with `fireWebshotByIndex`
 *
 * @example fireWebshot(0);
 *
 * @param {number} i
 */
function fireWebshot(i) {
  if (i < nGames) {
    var gameId = games[i].id;

    if (gameId) {
      var gameUrl = devPath + '/' + gameId,
        screenshotFilePath = screenshotFolderPath + '/' + gameId + '.jpg';

      webshot(gameUrl, screenshotFilePath, webshotOption, function(err) {
        console.log('i: ' + i + ', ' + gameId + '\'s screenshot has been saved to ' + screenshotFilePath);

        if (err) {
          console.log('================ ERROR: webshot is error');
          console.log(err);
        }

        fireWebshot(++i);
      });
    } else {
      console.log('================ ERROR: gameId is undefined (i: ' + i + ')');
    }
  } else {
    console.log('================ DONE');
  }
}

fireWebshot(0);

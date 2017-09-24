var webshot = require('webshot');
var program = require('commander');
var gameFilePath = './games/games.js';

// HACK
// import file
// http://stackoverflow.com/questions/4662851/how-do-you-import-non-node-js-files
eval(require('fs').readFileSync(gameFilePath, 'utf8'));

program
  .version('0.0.1')
  .option('-i, --index [index]', 'start index')
  .parse(process.argv);

var startIndex = program.index || 0;
var screenshotFolderPath = './screenshots';
var devPath = 'http://localhost:3000/games';
var nGames = games.length;

/* ================================================================ Screenshot
 */

var webshotOption = {
  renderDelay: 2000
};

/**
 * [fireWebshotByIndex description]
 *
 * @example fireWebshotByIndex(0);
 * @example fireWebshotByIndex(3);
 * @example fireWebshotByIndex(nGames - 1);
 *
 * @param {number} idx
 * @param {function} cb
 */
function fireWebshotByIndex(idx, cb) {
  console.log(games[idx])
  var gameName = games[idx].name;

  if (gameName) {
    var gameUrl = `${devPath}/${gameName}`
    var screenshotFilePath = `${screenshotFolderPath}/${gameName}.jpg`;

    webshot(gameUrl, screenshotFilePath, webshotOption, function(err) {
      if (err) {
        console.log('ERROR: webshot is error', err);
      } else {
        console.log(`idx: ${idx}, screenshot has been saved to ${screenshotFilePath}`);
      }

      cb()
    });
  } else {
    console.log(`ERROR: gameName is undefined (i: ${i})`);
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
    fireWebshotByIndex(i, function() {
      fireWebshot(++i);
    });
  } else {
    console.log('================ DONE');
  }
}

fireWebshot(startIndex);

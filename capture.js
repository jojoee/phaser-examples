var webshot = require('webshot');
var gameFilePath = './games/games.js';

// HACK
// import file
// http://stackoverflow.com/questions/4662851/how-do-you-import-non-node-js-files
eval(require('fs').readFileSync(gameFilePath, 'utf8'));

var screenshotFolderPath = './screenshots',
  devPath = 'http://localhost:3000/games',
  nGames = games.length;
  

var webshotOption = {
  renderDelay: 1000
};

function fireWebshot(i) {
  if (i >= 0) {
    var gameId = games[i].id;

    if (gameId) {
      var gameUrl = devPath + '/' + gameId,
        screenshotFilePath = screenshotFolderPath + '/' + gameId + '.jpg';

      webshot(gameUrl, screenshotFilePath, webshotOption, function(err) {  
        console.log(gameId + '\'s screenshot has been saved to ' + screenshotFilePath);

        if (err) {
          console.log('================ ERROR: webshot is error');
          console.log(err);
        }

        fireWebshot(--i);
      });

    } else {
      console.log('================ ERROR: gameId is undefined (i: ' + i + ')');
    }

  } else {
    console.log('================ DONE');
  }
}

fireWebshot(nGames - 1);

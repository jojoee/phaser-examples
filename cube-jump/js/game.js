// the game itself
var game;
// when the window loads...
window.onload = function() {
  // creation of a new Phaser.Game instance. Width: 320px, height: 640px; 
  game = new Phaser.Game(320, 640);
  // creation of a new Phaser state called "PlayGame"
  game.state.add("PlayGame", playGame)
    // starting "PlayGame" state;
  game.state.start("PlayGame");
}
// PlayGame state
var playGame = function(game) {}
playGame.prototype = {
  preload: function() {
    // loading the sprite sheet with all platforms
    game.load.spritesheet("platforms", "assets/platforms.png", 346, 258);
  },
  create: function() {
    // placing seven platforms on the canvas
    for (var i = 0; i < 7; i++) {
      addPlatform(i, game.rnd.between(0, 2));
    }
  }
}
// addPlatform function, the core of the script. Arguments: posY -> vertical position; size -> platform size
function addPlatform(posY, size) {
  // array with possible platform colors
  var platformColors = ["0xff0000", "0x00ff00", "0x0000ff", "0xffff00", "0xff00ff", "0x00ffff"];
  // minimum delay between the creation of the current platform and the creation of next platform, according to platform size.
  // index recap
  // 0: minimum delay after a one-sized platform
  // 1: min delay after a two-sized platform
  // 2: min delay after a three-sized platform
  var delayArray = [520, 840, 1160];
  // this array contains the x and y coordinates of the initial and final platform position
  // index recap
  // 0 start x coordinate
  // 1 start y coordinate
  // 2 end x coordinate
  // 3 end y coordinate
  var startEndArray = [500, -300 + posY * 120, 500 - 800 * Math.cos(Math.PI / 6), -300 + posY * 120 + 800 * Math.sin(Math.PI / 6)];
  // startX is startEndArray[0] or startEndArray[2] according to posY value
  var startX = startEndArray[0 + 2 * (posY % 2)];
  // startY is startEndArray[1] or startEndArray[3] according to posY value
  var startY = startEndArray[1 + 2 * (posY % 2)];
  // endX is startEndArray[0] or startEndArray[2] according to posY value
  var endX = startEndArray[2 - 2 * (posY % 2)];
  // endY is startEndArray[1] or startEndArray[3] according to posY value
  var endY = startEndArray[3 - 2 * (posY % 2)];
  // placing the platform itself
  var platform = game.add.sprite(startX, startY, "platforms");
  // showing the proper frame
  platform.frame = size;
  // scaling the platform
  platform.scale.setTo(0.5);
  // tinting the platform with a random color
  platform.tint = platformColors[game.rnd.between(0, platformColors.length - 1)];
  // determining next platform size
  var nextPlatform = game.rnd.between(0, 2);
  // tween to make the platform move from the starting point to the end point 
  var platformTween = game.add.tween(platform).to({
    x: endX,
    y: endY,
  }, 5000, Phaser.Easing.Linear.None, true);
  // when the easing is complete, then destroy the platform
  platformTween.onComplete.add(function(p) {
      p.destroy();
    })
    // wait for the minimum delay + a random delay before placing another platform.
    // the way I choose the delay from delayArray varies according to platform direction
  if (posY % 2 == 0) {
    game.time.events.add(delayArray[platform.frame] + game.rnd.between(100, 250), function() {
      addPlatform(posY, nextPlatform);
    });
  } else {
    game.time.events.add(delayArray[nextPlatform] + game.rnd.between(100, 250), function() {
      addPlatform(posY, nextPlatform);
    });
  }
}
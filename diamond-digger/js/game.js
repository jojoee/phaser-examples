var game = new Phaser.Game(315, 315, Phaser.CANVAS, "", {
  preload: onPreload,
  create: onCreate
});
var tileSize = 35; // tile size, in pixels
var fieldSize = 9; // number of tiles per row/column
var tileTypes = 3; // different kind of tiles allowed
var tileArray = []; // array with all game tiles
var groundArray = []; // array with rocks and water
var tileGroup; // group for sprites representing the tiles
var groundGroup; // group for sprites representing the ground
function onPreload() {
  game.load.spritesheet("tiles", "assets/tiles.png", 35, 35);
  game.load.image("rock", "assets/rock.png");
  game.load.image("water", "assets/water.png");
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  // game.scale.setScreenSize(true);
}

function onCreate() {
  groundGroup = game.add.group();
  tileGroup = game.add.group();
  for (i = 0; i < fieldSize; i++) {
    tileArray[i] = [];
    groundArray[i] = [];
    for (j = 0; j < fieldSize; j++) {
      var randomTile = Math.floor(Math.random() * tileTypes)
      var theTile = game.add.sprite(j * tileSize + tileSize / 2, i * tileSize + tileSize / 2, "tiles");
      theTile.frame = randomTile;
      theTile.anchor.setTo(0.5, 0.5);
      tileGroup.add(theTile);
      tileArray[i][j] = theTile;
      if (Math.random() > 0.4) {
        var theRock = game.add.sprite(j * tileSize + tileSize / 2, i * tileSize + tileSize / 2, "rock");
        theRock.anchor.setTo(0.5, 0.5);
        groundGroup.add(theRock);
        groundArray[i][j] = theRock;
      }
    }
  }
  var waterCol = Math.floor(Math.random() * fieldSize);
  if (groundArray[0][waterCol] != null) {
    groundArray[0][waterCol].destroy();
    groundArray[0][waterCol] = null;
  }
  waterFill(0, waterCol)
  game.input.onDown.add(pickTile, this);
}
// a tile has been picked
function pickTile() {
  // save input coordinates
  startX = game.input.worldX;
  startY = game.input.worldY;
  // retrieve selected row and column 
  selectedRow = Math.floor(startY / tileSize);
  selectedCol = Math.floor(startX / tileSize);
  // delete using flood fill
  floodFill(selectedRow, selectedCol, tileArray[selectedRow][selectedCol].frame);
  // make existing gems fall down
  fallDown();
  // replenish game field from the top 
  fallFromTop();
}

function waterFill(row, col) {
  if (row >= 0 && row < fieldSize && col >= 0 && col < fieldSize) {
    if (groundArray[row][col] == null) {
      var theWater = game.add.sprite(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, "water");
      theWater.anchor.setTo(0.5, 0.5);
      groundGroup.add(theWater);
      groundArray[row][col] = theWater;
      waterFill(row + 1, col);
      waterFill(row - 1, col);
      waterFill(row, col + 1);
      waterFill(row, col - 1);
    }
  }
}

function floodFill(row, col, val) {
  if (row >= 0 && row < fieldSize && col >= 0 && col < fieldSize) {
    if (tileArray[row][col] != null && tileArray[row][col].frame == val) {
      tileArray[row][col].destroy();
      tileArray[row][col] = null;
      if (groundArray[row][col] != null && groundArray[row][col].key == "rock") {
        groundArray[row][col].destroy();
        groundArray[row][col] = null;
        if (nextToWater(row, col)) {
          waterFill(row, col);
        }
      }
      floodFill(row + 1, col, val);
      floodFill(row - 1, col, val);
      floodFill(row, col + 1, val);
      floodFill(row, col - 1, val);
    }
  }
}

function nextToWater(row, col) {
  if (col > 0 && groundArray[row][col - 1] != null && groundArray[row][col - 1].key == "water") {
    return true;
  }
  if (row > 0 && groundArray[row - 1][col] != null && groundArray[row - 1][col].key == "water") {
    return true;
  }
  if (row < fieldSize - 1 && groundArray[row + 1][col] != null && groundArray[row + 1][col].key == "water") {
    return true;
  }
  if (col < fieldSize - 1 && groundArray[row][col + 1] != null && groundArray[row][col + 1].key == "water") {
    return true;
  }
  return false;
}

function fallDown() {
  for (var i = fieldSize - 1; i >= 0; i--) {
    for (var j = 0; j < fieldSize; j++) {
      if (tileArray[i][j] != null) {
        var delta = holesBelow(i, j);
        if (delta > 0) {
          var tileTween = game.add.tween(tileArray[i][j]);
          tileTween.to({
            y: (i + delta) * tileSize + tileSize / 2
          }, 800, Phaser.Easing.Cubic.Out, true);
          tileArray[i + delta][j] = tileArray[i][j];
          tileArray[i][j] = null;
        }
      }
    }
  }
}

function fallFromTop() {
  for (i = 0; i < fieldSize; i++) {
    var holes = holesBelow(-1, i);
    for (j = 0; j < holes; j++) {
      var randomTile = Math.floor(Math.random() * tileTypes);
      var tileXPos = i * tileSize + tileSize / 2;
      var tileYPos = -(holes - j) * tileSize - tileSize / 2;
      var theTile = game.add.sprite(tileXPos, tileYPos, "tiles");
      theTile.frame = randomTile;
      theTile.anchor.setTo(0.5, 0.5);
      tileGroup.add(theTile);
      tileArray[j][i] = theTile;
      tileTween = game.add.tween(tileArray[j][i]);
      tileTween.to({
        y: j * tileSize + tileSize / 2
      }, 800, Phaser.Easing.Cubic.Out, true);
    }
  }
}

function holesBelow(row, col) {
  var holes = 0;
  for (var i = row + 1; i < fieldSize; i++) {
    if (tileArray[i][col] == null) {
      holes++;
    }
  }
  return holes;
}
window.onload = function() {
  var game = new Phaser.Game(300, 300, Phaser.CANVAS, "", {
    preload: onPreload,
    create: onCreate,
    update: onUpdate
  });
  // you can change these values to customize the game
  var tileSize = 50; // tile size, in pixels
  var fieldSize = 6; // number of tiles per row/column
  var tileTypes = 6; // different kind of tiles allowed
  var pickedZoom = 1.1; // zoom ratio to highlight picked tile
  // variables used by game engine
  var dragging = false; // are we dragging?
  var movingRow; // row of the moving tile
  var movingCol; // col of the moving tile
  var tileArray = []; // array with all game tiles
  var tileGroup; // group containing all tiles
  var movingTileGroup; // group containing the moving tile
  // when preloading, load the spritesheet with all tiles
  function onPreload() {
    game.load.spritesheet("tiles", "assets/tiles.png", tileSize, tileSize);
  }
  // the game has been created
  function onCreate() {
    // show the game in full screen
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize();
    // add groups. movingTileGroup needs to be above tileGroup so moving tiles
    // will always have an higher z index and will always stay on top of the game
    tileGroup = game.add.group();
    movingTileGroup = game.add.group();
    // game field generation, all tiles initially added to "tileGroup" tile
    for (i = 0; i < fieldSize; i++) {
      tileArray[i] = [];
      for (j = 0; j < fieldSize; j++) {
        var randomTile = Math.floor(Math.random() * tileTypes)
        theTile = game.add.sprite(j * tileSize + tileSize / 2, i * tileSize + tileSize / 2, "tiles");
        theTile.frame = randomTile;
        theTile.anchor.setTo(0.5, 0.5);
        tileArray[i][j] = theTile;
        tileGroup.add(theTile);
      }
    }
    // listener for input down
    game.input.onDown.add(pickTile, this);
  }
  // a tile has been picked
  function pickTile() {
    // save input coordinates
    startX = game.input.worldX;
    startY = game.input.worldY;
    // retrieve picked row and column 
    movingRow = Math.floor(startY / tileSize);
    movingCol = Math.floor(startX / tileSize);
    // move the tile to the upper group, so it will surely be at top of the stage
    movingTileGroup.add(tileArray[movingRow][movingCol]);
    // zoom the tile
    tileArray[movingRow][movingCol].width = tileSize * pickedZoom;
    tileArray[movingRow][movingCol].height = tileSize * pickedZoom;
    // now dragging is allowed
    dragging = true
      // update listeners
    game.input.onDown.remove(pickTile, this);
    game.input.onUp.add(releaseTile, this);
  }
  // a tile has been released
  function releaseTile() {
    // remove the listener
    game.input.onUp.remove(releaseTile, this);
    // return the tile to its originary group
    tileGroup.add(tileArray[movingRow][movingCol]);
    // determine landing row and column
    var landingRow = Math.floor(tileArray[movingRow][movingCol].y / tileSize);
    var landingCol = Math.floor(tileArray[movingRow][movingCol].x / tileSize);
    // reset the moving tile to its original size
    tileArray[movingRow][movingCol].width = tileSize;
    tileArray[movingRow][movingCol].height = tileSize;
    // swap tiles, both visually and in tileArray array...
    tileArray[movingRow][movingCol].x = landingCol * tileSize + tileSize / 2;
    tileArray[movingRow][movingCol].y = landingRow * tileSize + tileSize / 2;
    // ...but only if there moving and landing tiles are different!!
    if (movingRow != landingRow || movingCol != landingCol) {
      // place the tile to move on the upper group
      movingTileGroup.add(tileArray[landingRow][landingCol]);
      // destination tile will move to start tile with a tween
      var tileTween = game.add.tween(tileArray[landingRow][landingCol]);
      tileTween.to({
        x: movingCol * tileSize + tileSize / 2,
        y: movingRow * tileSize + tileSize / 2
      }, 800, Phaser.Easing.Cubic.Out, true); // <- this "true" means "start immediatly"
      tileTween.onComplete.add(function() {
        tileGroup.add(tileArray[landingRow][landingCol]);
        // once the tween is completed update tileArray array
        game.input.onDown.add(pickTile, this);
        var temp = tileArray[landingRow][landingCol];
        tileArray[landingRow][landingCol] = tileArray[movingRow][movingCol];
        tileArray[movingRow][movingCol] = temp;
      });
    } else {
      // otherwise just let the player be able to swap another tile
      game.input.onDown.add(pickTile, this);
    }
    // we aren't dragging anymore
    dragging = false;
  }
  // the game is being updated
  function onUpdate() {
    // if we are dragging a tile
    if (dragging) {
      // check x and y distance from starting to current input location
      distX = game.input.worldX - startX;
      distY = game.input.worldY - startY;
      // move the tile
      tileArray[movingRow][movingCol].x = movingCol * tileSize + tileSize / 2 + distX;
      tileArray[movingRow][movingCol].y = movingRow * tileSize + tileSize / 2 + distY;
    }
  }
};
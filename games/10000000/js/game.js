window.onload = function() {
  var game = new Phaser.Game(300, 300, Phaser.CANVAS, "", {
    preload: onPreload,
    create: onCreate,
    update: onUpdate
  });
  // tile size, in pixels
  var tileSize = 50;
  // number of tiles per row/column
  var fieldSize = 6;
  // different kind of tiles allowed
  var tileTypes = 6
    // are we dragging?
  var dragging = false;
  // row to move
  var movingRow;
  // column to move
  var movingCol;
  // array with all game tiles
  var tileArray = [];
  // x coordinate saved when the player starts dragging
  var startX;
  // y coordinate saved when the player starts dragging
  var startY;
  // horizontal distance travelled during dragging
  var distX;
  // vertical distance travelled during dragging
  var distY;
  // dragging direction
  var dragDirection = "";
  // temporary tile
  var tempTile;
  // THE GAME IS PRELOADING
  function onPreload() {
    // loading the spritesheet with all tiles
    game.load.spritesheet("tiles", "assets/tiles.png", tileSize, tileSize);
  }
  // THE GAME HAS BEEN CREATED
  function onCreate() {
    // showing the game in full screen
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize();
    // generating the game field
    for (i = 0; i < fieldSize; i++) {
      tileArray[i] = [];
      for (j = 0; j < fieldSize; j++) {
        var randomTile = Math.floor(Math.random() * tileTypes)
        theTile = game.add.sprite(j * tileSize, i * tileSize, "tiles");
        // "frame" and "value" are custom attributes
        theTile.frame = randomTile;
        theTile.value = randomTile;
        tileArray[i][j] = theTile;
      }
    }
    // at this time we also create temporary tiles
    tempTile = game.add.sprite(0, 0, "tiles");
    tempTile.visible = false;
    // listener for input down
    game.input.onDown.add(pickTile, this);
  }
  // A TILE HAS BEEN PICKED
  function pickTile() {
    // Saving input coordinates
    startX = game.input.worldX;
    startY = game.input.worldY;
    // Saving row and column numbers
    movingRow = Math.floor(startY / tileSize);
    movingCol = Math.floor(startX / tileSize);
    // now dragging is allowed
    dragging = true
      // updating listeners
    game.input.onDown.remove(pickTile, this);
    game.input.onUp.add(releaseTile, this);
  }
  // A TILE HAS BEEN RELEASE3D
  function releaseTile() {
    // did we drag horizontally or vertically?
    switch (dragDirection) {
      case "horizontal":
        // determining how many tiles we shifted and adjusting game array
        // and tiles accordingly
        var shiftAmount = Math.floor(distX / (tileSize / 2));
        shiftAmount = Math.ceil(shiftAmount / 2) % fieldSize;
        var tempArray = [];
        if (shiftAmount > 0) {
          for (i = 0; i < fieldSize; i++) {
            tempArray[(shiftAmount + i) % fieldSize] = tileArray[movingRow][i].value;
          }
        } else {
          shiftAmount *= -1;
          for (i = 0; i < fieldSize; i++) {
            tempArray[i] = tileArray[movingRow][(shiftAmount + i) % fieldSize].value;
          }
        }
        for (i = 0; i < fieldSize; i++) {
          tileArray[movingRow][i].value = tempArray[i];
          tileArray[movingRow][i].frame = tempArray[i];
          tileArray[movingRow][i].x = i * tileSize;
        }
        break;
      case "vertical":
        // determining how many tiles we shifted and adjusting game array
        // and tiles accordingly
        var shiftAmount = Math.floor(distY / (tileSize / 2));
        shiftAmount = Math.ceil(shiftAmount / 2) % fieldSize;
        var tempArray = [];
        if (shiftAmount > 0) {
          for (i = 0; i < fieldSize; i++) {
            tempArray[(shiftAmount + i) % fieldSize] = tileArray[i][movingCol].value;
          }
        } else {
          shiftAmount *= -1;
          for (i = 0; i < fieldSize; i++) {
            tempArray[i] = tileArray[(shiftAmount + i) % fieldSize][movingCol].value;
          }
        }
        for (i = 0; i < fieldSize; i++) {
          tileArray[i][movingCol].value = tempArray[i];
          tileArray[i][movingCol].frame = tempArray[i];
          tileArray[i][movingCol].y = i * tileSize;
        }
        break;
    }
    // let the player be able to pick and drag again
    dragDirection = "";
    dragging = false;
    tempTile.visible = false;
    game.input.onUp.remove(releaseTile, this);
    game.input.onDown.add(pickTile, this);
  }
  // THE GAME IS GOING TO BE UPDATED
  function onUpdate() {
    if (dragging) {
      distX = game.input.worldX - startX;
      distY = game.input.worldY - startY;
      switch (dragDirection) {
        // dragging, but still looking for a direction
        case "":
          var dist = distX * distX + distY * distY;
          if (dist > 25) {
            var dragAngle = Math.abs(Math.atan2(distY, distX));
            if ((dragAngle > Math.PI / 4 && dragAngle < 3 * Math.PI / 4)) {
              dragDirection = "vertical";
            } else {
              dragDirection = "horizontal";
            }
          }
          break;
          // horizontal drag
        case "horizontal":
          tempTile.visible = false;
          tempTile.y = movingRow * tileSize;
          var deltaX = (Math.floor(distX / tileSize) % fieldSize);
          if (deltaX >= 0) {
            tempTile.frame = tileArray[movingRow][fieldSize - 1 - deltaX].value;
          } else {
            deltaX = deltaX * -1 - 1;
            tempTile.frame = tileArray[movingRow][deltaX].value;
          }
          for (i = 0; i < fieldSize; i++) {
            tileArray[movingRow][i].x = (i * tileSize + distX) % (tileSize * fieldSize);
            if (tileArray[movingRow][i].x < 0) {
              tileArray[movingRow][i].x += tileSize * fieldSize;
            }
            if (distX % tileSize > 0) {
              tempTile.visible = true;
              tempTile.x = distX % tileSize - tileSize;
            }
            if (distX % tileSize < 0) {
              tempTile.visible = true;
              tempTile.x = distX % tileSize;
            }
          }
          break;
          // vertical drag
        case "vertical":
          tempTile.visible = false;
          tempTile.x = movingCol * tileSize;
          var deltaY = (Math.floor(distY / tileSize) % fieldSize);
          if (deltaY >= 0) {
            tempTile.frame = tileArray[fieldSize - 1 - deltaY][movingCol].value;
          } else {
            deltaY = deltaY * -1 - 1;
            tempTile.frame = tileArray[deltaY][movingCol].value;
          }
          for (i = 0; i < fieldSize; i++) {
            tileArray[i][movingCol].y = (i * tileSize + distY) % (tileSize * fieldSize);
            if (tileArray[i][movingCol].y < 0) {
              tileArray[i][movingCol].y += tileSize * fieldSize;
            }
            if (distY % tileSize > 0) {
              tempTile.visible = true;
              tempTile.y = distY % tileSize - tileSize;
            }
            if (distY % tileSize < 0) {
              tempTile.visible = true;
              tempTile.y = distY % tileSize;
            }
          }
          break;
      }
    }
  }
};
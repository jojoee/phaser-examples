window.onload = function() {
  var game = new Phaser.Game(540, 540, Phaser.CANVAS, "", {
    preload: onPreload,
    create: onCreate
  });
  var fillMap = []; // array containing the map
  fillMap[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  fillMap[1] = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  fillMap[2] = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  fillMap[3] = [1, 0, 0, 1, 0, 0, 0, 0, 1];
  fillMap[4] = [1, 1, 1, 0, 0, 0, 1, 1, 1];
  fillMap[5] = [1, 0, 0, 0, 0, 1, 0, 0, 1];
  fillMap[6] = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  fillMap[7] = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  fillMap[8] = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  var tileSize = 60; // tile width, in pixels
  var colors = [0xFFFFFF, 0x000000, 0xFF0000]; // colors to tint tiles according to their value
  function onPreload() {
    game.load.image("tile", "assets/tile.png");
  }

  function onCreate() {
    for (i = 0; i < 9; i++) {
      for (j = 0; j < 9; j++) {
        var tile = game.add.sprite(j * tileSize, i * tileSize, "tile");
        var value = fillMap[j][i]
        tile.tint = colors[value];
        fillMap[j][i] = {
          v: value,
          t: tile
        }
      }
    }
    game.input.onDown.add(fill);
  }

  function fill() {
    var col = Math.floor(game.input.worldX / tileSize);
    var row = Math.floor(game.input.worldY / tileSize);
    floodFill(row, col);
  }

  function floodFill(row, col) {
    if (fillMap[col][row].v == 0) {
      fillMap[col][row].v = 2;
      fillMap[col][row].t.tint = colors[2];
      floodFill(row + 1, col);
      floodFill(row - 1, col);
      floodFill(row, col + 1);
      floodFill(row, col - 1);
    }
  }
};

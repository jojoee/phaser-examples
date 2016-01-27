var game;
var gridWidth = 40;
var gridHeight = 40;
var tileSize = 16;
var sightRadius = 10;
var wallRatio = 3;
var maze = [];
window.onload = function() {
  game = new Phaser.Game(640, 640, Phaser.AUTO, "");
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame");
}
var playGame = function(game) {};
playGame.prototype = {
  preload: function() {
    game.load.image("tile", "assets/tile.png");
  },
  create: function() {
    for (var i = 0; i < gridHeight; i++) {
      maze[i] = [];
      for (var j = 0; j < gridWidth; j++) {
        maze[i][j] = 0;
        if (game.rnd.between(0, wallRatio) == 0) {
          maze[i][j] = 1;
          var wall = game.add.sprite(i * tileSize, j * tileSize, "tile");
          wall.tint = 0xff0000;
        }
      }
    }
    var startCol = game.rnd.between(0, gridWidth - 1);
    var startRow = game.rnd.between(0, gridHeight - 1);
    this.lineGroup = game.add.group();
    this.playerPosition = game.add.sprite(startCol * tileSize, startRow * tileSize, "tile");
    this.playerPosition.tint = 0x00ff00;
    this.playerPosition.alpha = 0.5;
    this.playerPosition.inputEnabled = true;
    this.playerPosition.input.enableDrag();
    this.playerPosition.input.boundsRect = new Phaser.Rectangle(0, 0, game.width, game.height);
    this.playerPosition.input.enableSnap(tileSize, tileSize, true, true);
  },
  update: function() {
    this.lineGroup.removeAll(true);
    this.drawCircle(this.playerPosition.x / tileSize, this.playerPosition.y / tileSize, sightRadius);
  },
  drawBresenham: function(x0, y0, x1, y1) {
    var dx = Math.abs(x1 - x0);
    var sx = -1;
    if (x0 < x1) {
      var sx = 1
    }
    var dy = Math.abs(y1 - y0);
    var sy = -1;
    if (y0 < y1) {
      var sy = 1;
    }
    var err = -dy / 2;
    if (dx > dy) {
      err = dx / 2;
    }
    do {
      if (x0 < 0 || y0 < 0 || x0 >= gridWidth || y0 >= gridHeight || maze[x0][y0] == 1) {
        break;
      }
      var tile = game.add.sprite(x0 * tileSize, y0 * tileSize, "tile");
      this.lineGroup.add(tile);
      var e2 = err;
      if (e2 > -dx) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dy) {
        err += dx;
        y0 += sy;
      }
    } while (x0 != x1 || y0 != y1)
  },
  drawCircle: function(x0, y0, radius) {
    var x = -radius
    var y = 0;
    var err = 2 - 2 * radius;
    do {
      this.drawBresenham(this.playerPosition.x / tileSize, this.playerPosition.y / tileSize, (x0 - x), (y0 + y));
      this.drawBresenham(this.playerPosition.x / tileSize, this.playerPosition.y / tileSize, (x0 - y), (y0 - x));
      this.drawBresenham(this.playerPosition.x / tileSize, this.playerPosition.y / tileSize, (x0 + x), (y0 - y));
      this.drawBresenham(this.playerPosition.x / tileSize, this.playerPosition.y / tileSize, (x0 + y), (y0 + x));
      radius = err;
      if (radius <= y) {
        y++;
        err += y * 2 + 1;
      }
      if (radius > x || err > y) {
        x++;
        err += x * 2 + 1;
      }
    } while (x < 0);
  }
}
var game;
var gameOptions = {
  tileSize: 100,
  gameWidth: 800,
  gameHeight: 1000
}
var levels = [
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 10, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 10, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 10, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 10, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 10, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 10, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 2, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 10, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 3, 0],
    [0, 0, 10, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 10, 0, 0]
  ]
]

window.onload = function () {
  game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight);
  game.state.add("PreloadGame", preloadGame);
  game.state.add("PlayGame", playGame);
  game.state.start("PreloadGame");
}
var preloadGame = function (game) {}
preloadGame.prototype = {
  preload: function () {
    game.stage.backgroundColor = 0x2c3e50;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.disableVisibilityChange = true;
    game.load.spritesheet("tiles", "assets/tiles.png", gameOptions.tileSize, gameOptions.tileSize);
  },
  create: function () {
    game.state.start("PlayGame", true, false, 0);
  }
}
var playGame = function (game) {}
playGame.prototype = {
  init: function (currentLevel) {
    this.currentLevel = currentLevel;
  },
  create: function () {
    this.undoArray = [];
    this.drawLevel();
    game.input.onTap.add(this.handleTap, this);
  },
  drawLevel: function () {
    this.localLevel = [];
    this.tileGroup = game.add.group();
    this.stepsGroup = game.add.group();
    for (var i = 0; i < levels[this.currentLevel].length; i++) {
      this.localLevel[i] = [];
      for (var j = 0; j < levels[this.currentLevel][i].length; j++) {
        var tile = game.add.sprite(j * gameOptions.tileSize, i * gameOptions.tileSize, "tiles", levels[this.currentLevel][i][j]);
        if (levels[this.currentLevel][i][j] == 0) {
          tile.alpha = 0.6 + game.rnd.realInRange(0, 0.3);
        }
        this.tileGroup.add(tile);
        this.localLevel[i][j] = {
          sprite: tile,
          value: levels[this.currentLevel][i][j]
        }
        var step = game.add.sprite(j * gameOptions.tileSize, i * gameOptions.tileSize, "tiles", 11);
        step.row = i;
        step.col = j;
        step.visible = false;
        this.stepsGroup.add(step);
      }
    }
    var restartButton = game.add.button(game.width / 2 - gameOptions.tileSize / 2, game.height - gameOptions.tileSize * 1.5, "tiles", function () {
      game.state.start("PlayGame", true, false, this.currentLevel);
    }, this, 13, 13);
  },
  handleTap: function (pointer, doubleTap) {
    var turnTiles = false;
    var tileTapRow = Math.floor(pointer.y / gameOptions.tileSize);
    var tileTapCol = Math.floor(pointer.x / gameOptions.tileSize);
    if (tileTapRow < 0 || tileTapCol < 0 || tileTapRow >= this.localLevel.length || tileTapCol >= this.localLevel[tileTapRow].length) {
      return;
    }
    var tileValue = this.localLevel[tileTapRow][tileTapCol].value;
    if (tileValue == 11 || tileValue == 21) {
      turnTiles = true;
      this.localLevel[this.selectedRow][this.selectedCol].sprite.frame = 12;
      this.localLevel[this.selectedRow][this.selectedCol].value = 11;
      var deltaX = game.math.clamp(tileTapCol - this.selectedCol, -1, 1);
      var deltaY = game.math.clamp(tileTapRow - this.selectedRow, -1, 1);
    }
    this.stepsGroup.forEach(function (item) {
      if (item.visible) {
        if (!turnTiles) {
          this.localLevel[item.row][item.col].value -= 11;
        } else {
          if ((deltaX > 0 && item.col > this.selectedCol) || (deltaX < 0 && item.col < this.selectedCol) || (deltaY > 0 && item.row > this.selectedRow) || (deltaY < 0 && item.row < this.selectedRow)) {
            this.localLevel[item.row][item.col].sprite.frame = 12;
            if (this.localLevel[item.row][item.col].value == 21) {
              game.time.events.add(Phaser.Timer.SECOND, function () {
                game.state.start("PlayGame", true, false, (this.currentLevel + 1) % 10);
              }, this);
            }
          } else {
            this.localLevel[item.row][item.col].value -= 11;
          }
        }
        item.visible = false;
      }
    }, this);
    if (tileValue > 0 && tileValue < 10) {
      this.showSteps(tileTapRow, tileTapCol, tileValue, 0, 1);
      this.showSteps(tileTapRow, tileTapCol, tileValue, 0, -1);
      this.showSteps(tileTapRow, tileTapCol, tileValue, 1, 0);
      this.showSteps(tileTapRow, tileTapCol, tileValue, -1, 0);
      this.selectedRow = tileTapRow;
      this.selectedCol = tileTapCol;
    }
  },
  showSteps: function (row, col, steps, deltaRow, deltaCol) {
    var stepsMade = 0;
    while (stepsMade < steps) {
      while (this.localLevel[row][col].value != 0 && this.localLevel[row][col].value != 10) {
        row += deltaRow;
        col += deltaCol;
        if (row < 0 || col < 0 || row >= this.localLevel.length || col >= this.localLevel[row].length) {
          return;
        }
      }
      this.stepsGroup.getChildAt(row * this.localLevel[col].length + col).visible = true;
      this.localLevel[row][col].value += 11;
      stepsMade++;
      row += deltaRow;
      col += deltaCol;
      if (row < 0 || col < 0 || row >= this.localLevel.length || col >= this.localLevel[row].length) {
        break;
      }
    }
  }
}
var game;

var gameOptions = {
  gameWidth: 800,
  gameHeight: 1400,
  tileSize: 140,
  fieldSize: {
    rows: 6,
    cols: 5
  },
  fallSpeed: 250,
  diagonal: false,
  colors: [0xff0000, 0x00ff00, 0x0000ff, 0xffff00]
}

window.onload = function () {
  game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight);
  game.state.add("TheGame", TheGame);
  game.state.start("TheGame");
}

var TheGame = function () {};

TheGame.prototype = {
  preload: function () {
    game.stage.backgroundColor = 0x444444;
    game.load.image("tiles", "assets/sprites/tiles.png");
    game.load.spritesheet("arrows", "assets/sprites/arrows.png", 420, 420);
  },
  create: function () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    this.createLevel();
    game.input.onDown.add(this.pickTile, this);
  },
  createLevel: function () {
    this.tilesArray = [];
    this.arrowsArray = [];
    // group creation and placement to stay in the center of the canvas
    this.tileGroup = game.add.group();
    this.arrowsGroup = game.add.group();
    this.tileGroup.x = (game.width - gameOptions.tileSize * gameOptions.fieldSize.cols) / 2;
    this.tileGroup.y = (game.height - gameOptions.tileSize * gameOptions.fieldSize.rows) / 2;
    this.arrowsGroup.x = this.tileGroup.x;
    this.arrowsGroup.y = this.tileGroup.y;
    tileMask = game.add.graphics(this.tileGroup.x, this.tileGroup.y);
    tileMask.beginFill(0xffffff);
    tileMask.drawRect(0, 0, gameOptions.tileSize * gameOptions.fieldSize.cols, gameOptions.tileSize * gameOptions.fieldSize.rows);
    this.tileGroup.mask = tileMask;
    // tile creation
    for (var i = 0; i < gameOptions.fieldSize.rows; i++) {
      this.tilesArray[i] = [];
      for (var j = 0; j < gameOptions.fieldSize.cols; j++) {
        this.addTile(i, j);
      }
    }
    this.removedTiles = [];
  },
  addTile: function (row, col) {
    // adding a new tile
    var tileXPos = col * gameOptions.tileSize + gameOptions.tileSize / 2;
    var tileYPos = row * gameOptions.tileSize + gameOptions.tileSize / 2;
    var theTile = game.add.sprite(tileXPos, tileYPos, "tiles");
    theTile.anchor.set(0.5);
    theTile.picked = false;
    theTile.coordinate = new Phaser.Point(col, row);
    theTile.value = Phaser.ArrayUtils.getRandomItem(gameOptions.colors);
    theTile.tint = theTile.value;
    this.tilesArray[row][col] = theTile;
    var text = game.add.text(-gameOptions.tileSize / 4, 0, "R" + theTile.coordinate.y.toString() + ", C" + theTile.coordinate.x.toString(), {
      fill: "#000",
      font: "bold 24px Arial"
    });
    theTile.addChild(text);
    this.tileGroup.add(theTile);
  },
  pickTile: function (e) {
    // picking the first tile
    this.visitedTiles = [];
    this.visitedTiles.length = 0;
    if (this.tileGroup.getBounds().contains(e.position.x, e.position.y)) {
      var col = Math.floor((e.position.x - this.tileGroup.x) / gameOptions.tileSize);
      var row = Math.floor((e.position.y - this.tileGroup.y) / gameOptions.tileSize);
      this.tilesArray[row][col].alpha = 0.5;
      this.tilesArray[row][col].picked = true;
      this.pickedColor = this.tilesArray[row][col].value
      game.input.onDown.remove(this.pickTile, this);
      game.input.onUp.add(this.releaseTile, this);
      game.input.addMoveCallback(this.moveTile, this);
      this.visitedTiles.push(this.tilesArray[row][col].coordinate);
      console.log("Picked tile at R" + row + ", C" + col);
    }
  },
  moveTile: function (e) {
    // we are over a tile
    if (this.tileGroup.getBounds().contains(e.position.x, e.position.y)) {
      var col = Math.floor((e.position.x - this.tileGroup.x) / gameOptions.tileSize);
      var row = Math.floor((e.position.y - this.tileGroup.y) / gameOptions.tileSize);
      var distance = new Phaser.Point(e.position.x - this.tileGroup.x, e.position.y - this.tileGroup.y).distance(this.tilesArray[row][col]);
      // we are inside enough a tile
      if (distance < gameOptions.tileSize * 0.4 && this.tilesArray[row][col].value == this.pickedColor) {
        // a new, adjacent tile
        if (!this.tilesArray[row][col].picked && this.checkAdjacent(new Phaser.Point(col, row), this.visitedTiles[this.visitedTiles.length - 1])) {
          this.tilesArray[row][col].picked = true;
          this.tilesArray[row][col].alpha = 0.5;
          this.visitedTiles.push(this.tilesArray[row][col].coordinate);
          this.addArrow();
          console.log("Adding tile at R" + row + ", C" + col);
        }
        // backtrack
        else {
          if (this.visitedTiles.length > 1 && row == this.visitedTiles[this.visitedTiles.length - 2].y && col == this.visitedTiles[this.visitedTiles.length - 2].x) {
            this.tilesArray[this.visitedTiles[this.visitedTiles.length - 1].y][this.visitedTiles[this.visitedTiles.length - 1].x].picked = false;
            this.tilesArray[this.visitedTiles[this.visitedTiles.length - 1].y][this.visitedTiles[this.visitedTiles.length - 1].x].alpha = 1;
            this.visitedTiles.pop();
            this.arrowsArray[this.arrowsArray.length - 1].destroy();
            this.arrowsArray.pop();
            console.log("Back to tile at R" + row + ",C" + col);
          }
        }
      }
    }
  },
  releaseTile: function () {
    game.input.onUp.remove(this.releaseTile, this);
    game.input.deleteMoveCallback(this.moveTile, this);
    // clear the path
    this.clearPath();
    // make tiles fall down
    this.tilesFallDown();
    // create new tiles
    this.placeNewTiles();
    console.log("----------------------------------------------------------");
  },
  checkAdjacent: function (p1, p2) {
    if (gameOptions.diagonal) {
      return (Math.abs(p1.x - p2.x) <= 1) && (Math.abs(p1.y - p2.y) <= 1);
    } else {
      return (Math.abs(p1.x - p2.x) == 1 && p1.y - p2.y == 0) || (Math.abs(p1.y - p2.y) == 1 && p1.x - p2.x == 0);
    }
  },
  addArrow: function () {
    // adding the arrows
    var fromTile = this.visitedTiles[this.visitedTiles.length - 2];
    var arrow = game.add.sprite(this.tilesArray[fromTile.y][fromTile.x].x, this.tilesArray[fromTile.y][fromTile.x].y, "arrows");
    this.arrowsGroup.add(arrow);
    arrow.anchor.set(0.5);
    // this routine handles arrow frame and angle according to its direction
    var tileDiff = new Phaser.Point(this.visitedTiles[this.visitedTiles.length - 1].x, this.visitedTiles[this.visitedTiles.length - 1].y)
    tileDiff.subtract(this.visitedTiles[this.visitedTiles.length - 2].x, this.visitedTiles[this.visitedTiles.length - 2].y);
    if (tileDiff.x == 0) {
      arrow.angle = -90 * tileDiff.y;
    } else {
      arrow.angle = 90 * (tileDiff.x + 1);
      if (tileDiff.y != 0) {
        arrow.frame = 1;
        if (tileDiff.y + tileDiff.x == 0) {
          arrow.angle -= 90;
        }
      }
    }
    this.arrowsArray.push(arrow);
  },
  clearPath: function () {
    this.arrowsGroup.removeAll(true);
    for (var i = 0; i < this.visitedTiles.length; i++) {
      console.log("Removed tile R" + this.visitedTiles[i].y + ", C" + this.visitedTiles[i].x);
      this.tilesArray[this.visitedTiles[i].y][this.visitedTiles[i].x].visible = false;
      this.removedTiles.push(this.tilesArray[this.visitedTiles[i].y][this.visitedTiles[i].x]);
      this.tilesArray[this.visitedTiles[i].y][this.visitedTiles[i].x] = null;
      console.log("Removed tilesArray entry [" + this.visitedTiles[i].y + "][" + this.visitedTiles[i].x + "]");
    }
  },
  tilesFallDown: function () {
    for (var i = gameOptions.fieldSize.cols - 1; i >= 0; i--) {
      for (var j = 0; j < gameOptions.fieldSize.rows; j++) {
        if (this.tilesArray[i][j] != null) {
          var holes = this.holesBelow(i, j);
          if (holes > 0) {
            var coordinate = new Phaser.Point(this.tilesArray[i][j].coordinate.x, this.tilesArray[i][j].coordinate.y);
            var destination = new Phaser.Point(j, i + holes);
            console.log("Tile at R" + coordinate.y + ", C" + coordinate.x + " moves to R" + destination.y + ", C" + destination.x)
            var tween = game.add.tween(this.tilesArray[i][j]).to({
              y: this.tilesArray[i][j].y + holes * gameOptions.tileSize
            }, gameOptions.fallSpeed, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.nextPick, this)
            this.tilesArray[destination.y][destination.x] = this.tilesArray[i][j]
            console.log("Replenished tilesArray entry [" + destination.y + "][" + destination.x + "]");
            this.tilesArray[coordinate.y][coordinate.x] = null;
            console.log("Removed tilesArray entry [" + coordinate.y + "][" + coordinate.x + "]");
            this.tilesArray[destination.y][destination.x].coordinate = new Phaser.Point(destination.x, destination.y)
            this.tilesArray[destination.y][destination.x].children[0].text = "R" + destination.y + ", C" + destination.x;
          }
        }
      }
    }
  },
  placeNewTiles: function () {
    for (var i = 0; i < gameOptions.fieldSize.cols; i++) {
      var holes = this.holesInCol(i);
      if (holes > 0) {
        for (var j = 1; j <= holes; j++) {
          var tileXPos = i * gameOptions.tileSize + gameOptions.tileSize / 2;
          var tileYPos = -j * gameOptions.tileSize + gameOptions.tileSize / 2;
          var theTile = this.removedTiles.pop();
          theTile.position = new Phaser.Point(tileXPos, tileYPos);
          theTile.visible = true;
          theTile.alpha = 1;
          theTile.picked = false;
          theTile.value = Phaser.ArrayUtils.getRandomItem(gameOptions.colors);
          theTile.tint = theTile.value;
          var tween = game.add.tween(theTile).to({
            y: theTile.y + holes * gameOptions.tileSize
          }, gameOptions.fallSpeed, Phaser.Easing.Linear.None, true)
          tween.onComplete.add(this.nextPick, this)
          theTile.coordinate = new Phaser.Point(i, holes - j);
          this.tilesArray[holes - j][i] = theTile;
          theTile.children[0].text = "R" + theTile.coordinate.y + ", C" + theTile.coordinate.x;
          console.log("Created a new tile at R" + theTile.coordinate.y.toString() + ", C" + theTile.coordinate.x.toString());
          console.log("Added tilesArray entry [" + (holes - j).toString() + "][" + i + "]");
        }
      }
    }
  },
  nextPick: function () {
    if (!game.input.onDown.has(this.pickTile, this)) {
      game.input.onDown.add(this.pickTile, this);
      console.log("added");
    }
  },
  holesBelow: function (row, col) {
    var result = 0;
    for (var i = row + 1; i < gameOptions.fieldSize.rows; i++) {
      if (this.tilesArray[i][col] == null) {
        result++;
      }
    }
    return result;
  },
  holesInCol: function (col) {
    var result = 0;
    for (var i = 0; i < gameOptions.fieldSize.rows; i++) {
      if (this.tilesArray[i][col] == null) {
        result++;
      }
    }
    return result;
  }
}
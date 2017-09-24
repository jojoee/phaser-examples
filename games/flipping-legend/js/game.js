// the game itself
var game;

// global object with game options
var gameOptions = {

  // width of the game, in pixels
  gameWidth: 640,

  // tint colors to be applied to tiles
  tileColors: [0x00ff00, 0x00aa00],

  // number of tiles visible, works better if it's even, in this first prototype
  verticalTiles: 9
}
window.onload = function () {

  // determining window width and height
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  // if we are in ladscape mode, then set window height to fake a potrait mode
  if (windowWidth > windowHeight) {
    windowHeight = windowWidth * 1.8;
  }

  // defining game height
  var gameHeight = windowHeight * gameOptions.gameWidth / windowWidth;

  // creation of the game istelf
  game = new Phaser.Game(gameOptions.gameWidth, gameHeight);

  // game states
  game.state.add("PreloadGame", preloadGame);
  game.state.add("PlayGame", playGame);
  game.state.start("PreloadGame");
}
var preloadGame = function (game) {}
preloadGame.prototype = {
  preload: function () {

    // making the game cover the biggest window area possible while showing all content
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.disableVisibilityChange = true;

    // floor tile
    game.load.image("tile", 'assets/tile.png');

    // hero sprite
    game.load.image("hero", 'assets/hero.png');

    // hole sprite
    game.load.image("hole", 'assets/hole.png');
  },
  create: function () {
    game.state.start("PlayGame");
  }
}
var playGame = function (game) {}
playGame.prototype = {
  create: function () {

    // useful to count travelled distance
    this.moves = 0;

    // determining tile size, according to game height and the amount of vertical tiles we want
    this.tileSize = game.height / gameOptions.verticalTiles;

    // amount of placed tiles, useful to tint even/odd tiles with different colors
    var placedTiles = 0;

    // horizontal offset to keep tiles centered in the game
    var offsetX = (game.width - this.tileSize * 3) / 2;

    // array which will contain the holes pool
    this.holePool = [];

    // array which will contain all tiles
    this.tileArray = [];

    // group which will contain all tiles
    this.tileGroup = game.add.group();

    // placing the group to have tiles centered in the game
    this.tileGroup.x = offsetX;

    // creation of a tween which will scroll the terrain down by one tile
    this.tileTween = game.add.tween(this.tileGroup).to({
      y: this.tileSize
    }, 100, Phaser.Easing.Linear.None);

    // since the endless runner thing is a fake, once we moved the terrain down by a tile
    // we reset its position, then move the lowest tiles to the top, giving the idea of an
    // infinite terrain
    this.tileTween.onComplete.add(function () {
      this.tileGroup.y = 0;
      this.tileGroup.forEach(function (child) {
        child.y += this.tileSize;
      }, this);

      // bottomIndex is the index of the array of tiles placed at the very bottom of the cancas
      var bottomIndex = this.moves % this.tileArray.length;

      // looping through the bottom row
      for (var i = 0; i < 3; i++) {

        // moving the tile to the top
        this.tileArray[bottomIndex][i].tileSprite.y -= (gameOptions.verticalTiles + 1) * this.tileSize;

        // if we have a hole sprite...
        if (this.tileArray[bottomIndex][i].holeSprite != null) {

          // kill it (set its alive, exists and visible properties to false)
          this.tileArray[bottomIndex][i].holeSprite.kill();

          // pushing hole sprite in hole pool
          this.holePool.push(this.tileArray[bottomIndex][i].holeSprite);

          // removing the hole from tiles array
          this.tileArray[bottomIndex][i].holeSprite = null;
        }
      }

      // placeHoles method will place holes on a row.
      // arguments are the current array index and the y position
      this.placeHoles(bottomIndex, this.tileArray[bottomIndex][0].tileSprite.y);

      // one more move has been made! Normally score is based on moves
      this.moves++;

      // checking if the hero is over a hole
      if (this.tileArray[(this.moves + 2) % this.tileArray.length][this.heroColumn].holeSprite != null) {
        game.state.start("PlayGame");
      }
    }, this);

    // placing and tinting terrain tiles
    for (var i = 0; i < gameOptions.verticalTiles + 1; i++) {
      this.tileArray[i] = [];
      for (var j = 0; j < 3; j++) {
        var tile = game.add.sprite(j * this.tileSize, game.height - i * this.tileSize, "tile");
        tile.anchor.set(0, 1);
        tile.width = this.tileSize;
        tile.height = this.tileSize;
        tile.tint = gameOptions.tileColors[placedTiles % 2];
        this.tileGroup.add(tile);

        // each item in the tile array has a tile sprite and may have a hole sprite
        this.tileArray[i][j] = {
          tileSprite: tile,
          holeSprite: null
        };
        placedTiles++;
      }

      // we start placing holes from the 6th row on
      if (i > 4) {
        this.placeHoles(i, game.height - i * this.tileSize);
      }
    }

    // column numvers ramge from 0 to 2. Hero starts at column 1, the one in the middle
    this.heroColumn = 1;

    // at the moment the hero can move
    this.heroCanMove = true;

    // adding and sizing hero sprite
    this.hero = game.add.sprite(this.tileGroup.x + this.tileSize, game.height - 2 * this.tileSize, "hero");
    this.hero.width = this.tileSize;
    this.hero.height = this.tileSize;
    this.hero.anchor.set(0, 1);

    // tween to move the sprite
    this.heroTween = game.add.tween(this.hero);

    // callback function to be called once the tween is complete
    this.heroTween.onComplete.add(function () {
      this.heroCanMove = true;
      this.hero.x = this.tileGroup.x + this.tileSize * this.heroColumn;
      this.heroWrap.visible = false;
    }, this);

    // and this is the second hero sprite, the one we will use to create the wrap effect
    this.heroWrap = game.add.sprite(this.tileGroup.x + this.tileSize, game.height - 2 * this.tileSize, "hero");
    this.heroWrap.width = this.tileSize;
    this.heroWrap.height = this.tileSize;
    this.heroWrap.anchor.set(0, 1);
    this.heroWrap.visible = false;
    this.heroWrapTween = game.add.tween(this.heroWrap);

    // mask to hide both hero and wrapHero once outside the path of tiles
    var mask = game.add.graphics(this.tileGroup.x, this.tileGroup.y);
    mask.beginFill(0xffffff);
    mask.drawRect(0, 0, this.tileSize * 3, game.height);
    this.hero.mask = mask;
    this.heroWrap.mask = mask;

    // waiting for player input
    game.input.onDown.add(this.moveHero, this);
  },
  placeHoles: function (row, posY) {

    // random number to see if we'll place a hole
    if (game.rnd.integerInRange(0, 1) == 0) {

      // random hole position
      var holeSpot = game.rnd.integerInRange(0, 2);

      // retrieve the hole from the pool when possible...
      if (this.holePool.length > 0) {
        var hole = this.holePool.pop();
        hole.x = holeSpot * this.tileSize;
        hole.y = posY;
        hole.revive();
      }

      // ... or create a new one
      else {
        var hole = game.add.sprite(holeSpot * this.tileSize, posY, "hole");
        hole.anchor.set(0, 1);
        hole.width = this.tileSize;
        hole.height = this.tileSize;
        this.tileGroup.add(hole);
      }

      // adding the hole to tileArrays
      this.tileArray[row][holeSpot].holeSprite = hole;
    }
  },
  moveHero: function (e) {

    // can the hero move?
    if (this.heroCanMove) {

      // start the tween which moves the terrain
      this.tileTween.start();

      // the hero can't move at the moment
      this.heroCanMove = false;

      // setting hero direction to left if the player clicked/touched the left half of the canvas, or right otherwise
      var direction = e.position.x < game.width / 2 ? -1 : 1;

      // calculating hero next column
      var nextColumn = Phaser.Math.wrap(this.heroColumn + direction, 0, 3);

      // setting hero tween timeline to an empty array to prevent adding waypoints with "to" method
      this.heroTween.timeline = [];

      // new hero destination
      this.heroTween.to({
        x: this.hero.x + this.tileSize * direction
      }, 100, Phaser.Easing.Cubic.InOut, true);

      // this is the case with the wrapping hero coming into play
      if (Math.abs(nextColumn - this.heroColumn) != 1) {

        // making it visible
        this.heroWrap.visible = true;

        // placing it outside the final column
        this.heroWrap.x = nextColumn == 0 ? this.tileGroup.x - this.tileSize : this.tileGroup.x + 3 * this.tileSize;

        // resetting tween timeline
        this.heroWrapTween.timeline = [];

        // finally making the wrap hero move
        this.heroWrapTween.to({
          x: this.heroWrap.x + this.tileSize * direction
        }, 100, Phaser.Easing.Cubic.InOut, true);

      }
      this.heroColumn = nextColumn;
    }
  }
}
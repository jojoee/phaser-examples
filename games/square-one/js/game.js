// the game
var game;

// size of each square, in pixels
var squareSize = 40;

// square where the hero will start to walk
var startingSquare = 2;

// this is the time required to make a move, in milliseconds
var moveTime = 250;

// giving some color to ground squares
var squareColors = [0x888888, 0xaaaaaa];

// creation of the game, portrait mode 320x480
window.onload = function () {
  game = new Phaser.Game(320, 480);
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame");
}


var playGame = function (game) {}

playGame.prototype = {
  preload: function () {

    // preloading the assets
    game.load.image("square", "assets/square.png");
  },

  create: function () {
    // adding a group which will contain all terrain squares
    this.terrainGroup = game.add.group();

    // adding a group which will contain all enemies
    this.enemyGroup = game.add.group();

    // filling the field with squares to create the terrain
    for (var i = 0; i < game.width / squareSize + 2; i++) {

      // adding a terrain square
      var square = game.add.sprite(i * squareSize, game.height / 3 * 2, "square");

      // settings its anchor on the center
      square.anchor.set(0.5);

      // giving the square a tint color
      square.tint = squareColors[i % 2];

      // finally adding the square to the group
      this.terrainGroup.add(square);
    }

    // adding the hero
    this.hero = game.add.sprite(startingSquare * squareSize, game.height / 3 * 2 - squareSize, "square");

    // setting the anchor on its center
    this.hero.anchor.set(0.5);

    // flag to see if the hero can move
    this.hero.canMove = true;

    // enabling arcade physics on hero
    game.physics.enable(this.hero, Phaser.Physics.ARCADE);

    // we will move the hero manually
    this.hero.body.moves = false;

    // input listener waiting for mouse or touch input, then calling moveSquare method
    game.input.onDown.add(this.moveSquare, this);

    // let's add an enemy
    this.addEnemy();
  },

  // this method will be called each time the player tries to move the square
  moveSquare: function () {

    // can the hero move?
    if (this.hero.canMove) {

      // the hero is about to be moved so we aren't considering more inputs
      this.hero.canMove = false;

      // according to current square angle, we have to change its position and registration point
      // in order to make it rotate along the required pivot point
      // this part needs to be optimized but at the moment it works
      switch (this.hero.angle) {
        case 0:
          this.hero.x += squareSize / 2;
          this.hero.y += squareSize / 2;
          this.hero.pivot.x = squareSize / 2;
          this.hero.pivot.y = squareSize / 2;
          break;
        case 90:
          this.hero.x += squareSize;
          this.hero.pivot.x = squareSize / 2;
          this.hero.pivot.y = -squareSize / 2;
          break;
        case -180:
          this.hero.x += squareSize;
          this.hero.pivot.x = -squareSize / 2;
          this.hero.pivot.y = -squareSize / 2;
          break;
        case -90:
          this.hero.x += squareSize;
          this.hero.pivot.x = -squareSize / 2;
          this.hero.pivot.y = squareSize / 2;
      }

      // tween to scroll the terrain to the left by squareSize pixels
      var scrollTween = game.add.tween(this.terrainGroup).to({
        x: this.terrainGroup.x - squareSize
      }, moveTime, Phaser.Easing.Linear.None, true);

      // tween to scroll the enemies to the left by squareSize pixels
      var enemyTween = game.add.tween(this.enemyGroup).to({
        x: this.terrainGroup.x - squareSize
      }, moveTime, Phaser.Easing.Linear.None, true);

      // tween to rotate and move the hero
      var moveTween = game.add.tween(this.hero).to({
        angle: this.hero.angle + 90,
        x: this.hero.x - squareSize
      }, moveTime, Phaser.Easing.Linear.None, true);

      // once the tween has been completed...
      moveTween.onComplete.add(function () {

        // the hero can move again
        this.hero.canMove = true;

        // if hero's angle is zero, that is if we rotated by 360 degrees...
        if (this.hero.angle == 0) {

          // we restore hero original pivot point and position
          this.hero.pivot.x = 0;
          this.hero.pivot.y = 0;
          this.hero.x += squareSize / 2;
          this.hero.y -= squareSize / 2;
        }

        // we order all terrain squares according to their x position
        this.terrainGroup.sort("x", Phaser.Group.SORT_ASCENDING);

        // getting the leftmost enemy
        this.enemyGroup.sort("x", Phaser.Group.SORT_ASCENDING);

        // if the leftmost enemy left the stage, just like the leftmost tile did...
        if (this.enemyGroup.length > 0 && this.enemyGroup.getChildAt(0).x <= this.terrainGroup.getChildAt(0).x) {

          // ... then destroy it
          this.enemyGroup.getChildAt(0).destroy();
        }

        // we don't want to destroy assets to create new ones, we prefer to move the leftmost square
        // which is not visible anymore to the right.
        this.terrainGroup.getChildAt(0).x += this.terrainGroup.length * squareSize;

        // since this is a new tile, let's see if we should add an enemy
        if (game.rnd.integerInRange(0, 9) > 6) {

          // let's add an enemy
          this.addEnemy();
        }
      }, this);
    }
  },

  // function to add an enemy
  addEnemy: function () {

    // just a way to get the rightmost terrain tule
    this.terrainGroup.sort("x", Phaser.Group.SORT_DESCENDING);

    // adding the enemy over the rightmost tile
    var enemy = game.add.sprite(this.terrainGroup.getChildAt(0).x, 20, "square");
    enemy.anchor.set(0.5);
    enemy.tint = 0xff0000;

    // enabling arcade physics on enemy
    game.physics.enable(enemy, Phaser.Physics.ARCADE);

    // we will move the enemy manually
    enemy.body.moves = false;

    // giving the enemy a yoyo tween to move it at a random speed
    game.add.tween(enemy).to({
      y: game.height / 3 * 2 - squareSize,
    }, 1000 + game.rnd.integerInRange(0, 250), Phaser.Easing.Linear.None, true, 0, -1, true);

    this.enemyGroup.add(enemy);
  },

  // function to be executed at each frame
  update: function () {

    // looking for collision between the hero and enemies
    game.physics.arcade.collide(this.hero, this.enemyGroup, function () {

      // restart the game
      game.state.start("PlayGame");
    });
  }
}
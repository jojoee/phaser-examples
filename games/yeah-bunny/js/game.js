var game;
var gameOptions = {

  // width of the game, in pixels
  gameWidth: 640,

  // height of the game, in pixels
  gameHeight: 480,

  // background color
  bgColor: 0x444444,

  // player gravity
  playerGravity: 900,

  // player friction when on wall
  playerGrip: 100,

  // player horizontal speed
  playerSpeed: 200,

  // player jump force
  playerJump: 400,

  // player double jump force
  playerDoubleJump: 300
}
window.onload = function () {
  game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight);
  game.state.add("PreloadGame", preloadGame);
  game.state.add("PlayGame", playGame);
  game.state.start("PreloadGame");
}
var preloadGame = function (game) {}
preloadGame.prototype = {
  preload: function () {
    game.stage.backgroundColor = gameOptions.bgColor;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.disableVisibilityChange = true;

    // loading level tilemap
    game.load.tilemap("level", 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image("tile", "assets/tile.png");
    game.load.image("hero", "assets/hero.png");
  },
  create: function () {
    game.state.start("PlayGame");
  }
}
var playGame = function (game) {}
playGame.prototype = {
  create: function () {

    // starting ARCADE physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // creatin of "level" tilemap
    this.map = game.add.tilemap("level");

    // adding tiles (actually one tile) to tilemap
    this.map.addTilesetImage("tileset01", "tile");

    // tile 1 (the black tile) has the collision enabled
    this.map.setCollision(1);

    // which layer should we render? That's right, "layer01"
    this.layer = this.map.createLayer("layer01");

    // adding the hero sprite
    this.hero = game.add.sprite(300, 376, "hero");

    // setting hero anchor point
    this.hero.anchor.set(0.5);

    // enabling ARCADE physics for the  hero
    game.physics.enable(this.hero, Phaser.Physics.ARCADE);

    // setting hero gravity
    this.hero.body.gravity.y = gameOptions.playerGravity;

    // setting hero horizontal speed
    this.hero.body.velocity.x = gameOptions.playerSpeed;

    // the hero can jump
    this.canJump = true;

    // the hern cannot double jump
    this.canDoubleJump = false;

    // the hero is not on the wall
    this.onWall = false;

    // waiting for player input
    game.input.onDown.add(this.handleJump, this);

    // set workd bounds to allow camera to follow the player
    game.world.setBounds(0, 0, 1920, 1440);

    // making the camera follow the player
    game.camera.follow(this.hero, Phaser.Camera.FOLLOW_PLATFORMER, 0.1, 0.1);
  },
  handleJump: function () {
    // the hero can jump when:
    // canJump is true AND the hero is on the ground (blocked.down)
    // OR
    // the hero is on the wall
    if ((this.canJump && this.hero.body.blocked.down) || this.onWall) {

      // applying jump force
      this.hero.body.velocity.y = -gameOptions.playerJump;

      // is the hero on a wall?
      if (this.onWall) {

        // change the horizontal velocity too. This way the hero will jump off the wall
        this.setPlayerXVelocity(true);
      }

      // hero can't jump anymore
      this.canJump = false;

      // hero is not on the wall anymore
      this.onWall = false;

      // the hero can now double jump
      this.canDoubleJump = true;
    } else {

      // cam the hero make the doubple jump?
      if (this.canDoubleJump) {

        // the hero can't double jump anymore
        this.canDoubleJump = false;

        // applying double jump force
        this.hero.body.velocity.y = -gameOptions.playerDoubleJump;
      }
    }
  },
  update: function () {

    // set some default gravity values. Look at the function for more information
    this.setDefaultValues();

    // handling collision between the hero and the tiles
    game.physics.arcade.collide(this.hero, this.layer, function (hero, layer) {

      // some temporary variables to determine if the player is blocked only once
      var blockedDown = this.hero.body.blocked.down;
      var blockedLeft = this.hero.body.blocked.left
      var blockedRight = this.hero.body.blocked.right;

      // if the hero hits something, no double jump is allowed
      this.canDoubleJump = false;

      // hero on the ground
      if (blockedDown) {

        // hero can jump
        this.canJump = true;
      }

      // hero on the ground and touching a wall on the right
      if (blockedRight) {

        // horizontal flipping hero sprite
        this.hero.scale.x = -1;
      }

      // hero on the ground and touching a wall on the right
      if (blockedLeft) {

        // default orientation of hero sprite
        this.hero.scale.x = 1;
      }

      // hero NOT on the ground and touching a wall on the right
      if ((blockedRight || blockedLeft) && !blockedDown) {

        // hero on a wall
        this.onWall = true;

        // remove gravity
        this.hero.body.gravity.y = 0;

        // setting new y velocity
        this.hero.body.velocity.y = gameOptions.playerGrip;
      }

      // adjusting hero speed according to the direction it's moving
      this.setPlayerXVelocity(!this.onWall || blockedDown);
    }, null, this);
  },

  // default values to be set at the beginning of each update cycle,
  // which may be changed according to what happens into "collide" callback function
  // (if called)
  setDefaultValues: function () {
    this.hero.body.gravity.y = gameOptions.playerGravity;
    this.onWall = false;
    this.setPlayerXVelocity(true);
  },

  // sets player velocity according to the direction it's facing, unless "defaultDirection"
  // is false, in this case multiplies the velocity by -1
  setPlayerXVelocity(defaultDirection) {
    this.hero.body.velocity.x = gameOptions.playerSpeed * this.hero.scale.x * (defaultDirection ? 1 : -1);
  }
}
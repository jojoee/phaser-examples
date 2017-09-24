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

  // player horizontal speed
  playerSpeed: 200,

  // player force
  playerJump: 400
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
    this.hero = game.add.sprite(game.width / 2, 440, "hero");

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

    // the hero is not on the wall
    this.onWall = false;

    // waiting for player input
    game.input.onDown.add(this.handleJump, this);
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

        // flip horizontally the hero
        this.hero.scale.x *= -1;

        // change the horizontal velocity too. This way the hero will jump off the wall
        this.hero.body.velocity.x = gameOptions.playerSpeed * this.hero.scale.x;
      }

      // hero can't jump anymore
      this.canJump = false;

      // hero is not on the wall anymore
      this.onWall = false;
    }
  },
  update: function () {

    // handling collision between the hero and the tiles
    game.physics.arcade.collide(this.hero, this.layer, function (hero, layer) {

      // hero on the ground
      if (hero.body.blocked.down) {

        // hero can jump
        this.canJump = true;

        // hero not on the wall
        this.onWall = false;
      }

      // hero on the ground and touching a wall on the right
      if (this.hero.body.blocked.right && this.hero.body.blocked.down) {

        // horizontal flipping hero sprite
        this.hero.scale.x = -1;
      }

      // hero NOT on the ground and touching a wall on the right
      if (this.hero.body.blocked.right && !this.hero.body.blocked.down) {

        // hero on a wall
        this.onWall = true;
      }

      // same concept applies to the left
      if (this.hero.body.blocked.left && this.hero.body.blocked.down) {
        this.hero.scale.x = 1;
      }
      if (this.hero.body.blocked.left && !this.hero.body.blocked.down) {
        this.onWall = true;
      }

      // adjusting hero speed according to the direction it's moving
      this.hero.body.velocity.x = gameOptions.playerSpeed * this.hero.scale.x;
    }, null, this);
  }
}
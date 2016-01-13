var game = new Phaser.Game(
  640,
  480,
  Phaser.CANVAS,
  'game-canvas'
);

var ASSET_PATH = 'assets/';

var PhaserGame = function () {
  this.player = null;
  this.platforms = null;
  this.sky = null;

  this.facing = 'left';
  this.edgeTimer = 0;
  this.jumpTimer = 0;

  this.wasStanding = false;
  this.cursors = null;
};

PhaserGame.prototype = {
  init: function() {
    // set plugin
    this.game.add.plugin(Phaser.Plugin.Debug);

    // set render
    this.game.renderer.renderSession.roundPixels = true;

    // set world
    this.world.resize(640, 2000);

    // set physics
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 750;
    this.physics.arcade.skipQuadTree = false;

  },
  preload: function() {
    // We need this because the assets are on Amazon S3
    // Remove the next 2 lines if running locally
    // this.load.baseURL = 'http://files.phaser.io.s3.amazonaws.com/codingtips/issue003/';
    // this.load.crossOrigin = 'anonymous';

    // load all
    this.load.image('trees', ASSET_PATH + 'trees.png');
    this.load.image('clouds', ASSET_PATH + 'clouds.png');
    this.load.image('platform', ASSET_PATH + 'platform.png');
    this.load.image('ice-platform', ASSET_PATH + 'ice-platform.png');
    this.load.spritesheet('dude', ASSET_PATH + 'dude.png', 32, 48);
  },
  setPlatforms: function() {
    // set platform (normal/ice)
    var x = 0; // started x pos
    var y = 64; // started y pos
    for (var i = 0; i < 19; i++) {
      var type = i % 2 === 1 ? 'platform' : 'ice-platform';
      var platform = this.platforms.create(x, y, type);

      // random speed
      platform.body.velocity.x = this.rnd.between(100, 150);

      // random direction
      if (Math.random() > 0.5) {
        platform.body.velocity.x *= -1;
      }

      // step position
      x += 200;
      y += 104;

      // if x position more than game width
      x = (x >= 600) ? 0 : x;
    }
  },
  create: function() {
    // set bg color
    this.stage.backgroundColor = '#2f9acc';

    // set bg image
    this.sky = this.add.tileSprite(0, 0, 640, 480, 'clouds');
    this.sky.fixedToCamera = true;
    this.add.sprite(0, 1906, 'trees');

    // set platforms
    this.platforms = this.add.physicsGroup();
    this.setPlatforms();
    this.platforms.setAll('body.allowGravity', false);
    this.platforms.setAll('body.immovable', true);

    // set player
    this.player = this.add.sprite(320, 1952, 'dude');
    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.setSize(20, 32, 5, 16);
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('turn', [4], 20, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    // set camera
    this.camera.follow(this.player);

    // set arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
  },
  update: function() {
    // set bg (scroll bg)
    this.sky.tilePosition.y = -(this.camera.y * 0.7);

    // set platforms (reborn)
    this.platforms.forEach(this.wrapPlatform, this);

    // set collision
    this.physics.arcade.collide(this.player, this.platforms, this.setFriction, null, this);    

    // set player
    this.player.body.velocity.x = 0;

    // set input
    // 
    // if press left
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -200;

      if (this.facing !== 'left') {
        this.player.play('left');
        this.facing = 'left';  
      }

    // if press right
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 200;

      if (this.facing !== 'right') {
        this.player.play('right');
        this.facing = 'right';
      }

    // when not idle
    // - stop animation
    // - set player facing
    } else {
      if (this.facing !== 'idle') {
        this.player.animations.stop();

        if (this.facing === 'left') {
          this.player.frame = 0;
        } else {
          this.player.frame = 5;
        }

        this.facing = 'idle';
      }
    }

    this.jump();
  },
  jump: function() {
    // quite hard to understand

    // Do this AFTER the collide check, or we won't have blocked/touching set
    // this.player.body.blocked.down >> ground
    // this.player.body.touching.down >> platform
    // 
    // false false > jump
    // true false > on the ground
    // false true > on platform
    var standing = this.player.body.blocked.down || this.player.body.touching.down;

    var jumpingTime = 250; // jumping time per each
    var jumpVelocity = 500;

    // No longer standing on the edge, but were
    // Give them a 250ms grace period to jump after falling
    if (!standing && this.wasStanding) {
      this.edgeTimer = this.time.time + jumpingTime;
    }

    // Allowed to jump?
    if ((standing || this.time.time <= this.edgeTimer) &&
      this.cursors.up.isDown && // press down
      this.time.time > this.jumpTimer // 750ms passed
    ) {
      this.player.body.velocity.y = -jumpVelocity;
      this.jumpTimer = this.time.time + jumpVelocity + jumpingTime;
    }

    this.wasStanding = standing;
  },
  render: function() {
    this.game.debug.cameraInfo(game.camera, 24, 24);
    this.game.debug.spriteInfo(this.player, 24, 124);
    this.game.debug.text('facing: ' + this.facing, 24, 224);

    this.game.debug.text('time.time: ' + this.time.time, 24, 244);
    this.game.debug.text('edgeTimer: ' + this.edgeTimer, 24, 264);
    this.game.debug.text('jumpTimer: ' + this.jumpTimer, 24, 284);

    this.game.debug.text('blocked.down: ' + this.player.body.blocked.down, 24, 304);
    this.game.debug.text('touching.down: ' + this.player.body.touching.down, 24, 324);
  },
  wrapPlatform: function(platform) {
    // if platform exit screen by left
    // reborn on right
    if (platform.body.velocity.x < 0 && platform.x <= -160) {
      platform.x = 640;

    // reborn on left
    } else if (platform.body.velocity.x > 0 && platform.x >= 640) {
      platform.x = -160;
    }
  },
  setFriction: function (player, platform) {
    if (platform.key === 'ice-platform') {
      player.body.x -= platform.body.x - platform.body.prev.x;
    }
  }
};

game.state.add('Game', PhaserGame, true);

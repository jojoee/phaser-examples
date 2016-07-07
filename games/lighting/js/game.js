var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', {
  preload: function() {
    this.scale.pageAlignHorizontally = true;
    this.game.stage.backgroundColor = '#FFF';
    this.game.load.spritesheet('player', dataURI, 72, 72);
    this.game.load.image('black', blackURI);
    this.game.load.image('background', backgroundURI);
  },
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.gravity = 500;
    this.game.physics.arcade.gravity.y = this.gravity;
    var bg = this.game.add.image(0, 0, 'background');
    bg.width = this.game.width;
    bg.height = this.game.height - 50;
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 50, 'player');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.floor = this.game.add.sprite(0, this.game.world.height, 'black');
    this.floor.width = this.game.world.width;
    this.floor.height = 50;
    this.floor.anchor.y = 1;
    this.game.physics.arcade.enable(this.floor);
    this.floor.body.immovable = true;
    this.floor.body.moves = false;
    this.cursor = this.game.input.keyboard.createCursorKeys();
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
    ]);
    this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);
    this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);
    this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.floor);
    this.playerMovement();
    this.lightSprite.reset(this.game.camera.x, this.game.camera.y);
    this.updateShadowTexture();
  },
  playerMovement: function() {
    if (this.cursor.left.isDown) {
      this.player.body.velocity.x = -350;
      this.player.scale.x = -0.5;
    }
    if (this.cursor.right.isDown) {
      this.player.body.velocity.x = 350;
      this.player.scale.x = 0.5;
    }
    if (this.cursor.up.isDown) {
      this.player.body.velocity.y = -350;
    }
  },
  updateShadowTexture: function() {
    this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);
    var radius = 100 + this.game.rnd.integerInRange(1, 20),
      heroX = this.player.x - this.game.camera.x,
      heroY = this.player.y - this.game.camera.y;
    var gradient = this.shadowTexture.context.createRadialGradient(
      heroX, heroY, 100 * 0.75,
      heroX, heroY, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = gradient;
    this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI * 2, false);
    this.shadowTexture.context.fill();
    this.shadowTexture.dirty = true;
  }
});
var dataURI = 'assets/player.jpg';
var blackURI = 'assets/black.png';
var backgroundURI = 'assets/bg.jpg';
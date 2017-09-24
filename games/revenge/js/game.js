var game;

window.onload = function () {
  game = new Phaser.Game(960, 640, Phaser.AUTO, "");
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame");
}

var playGame = function (game) {};
playGame.prototype = {
  preload: function () {
    game.load.image("spaceship", "assets/sprites/spaceship.png");
    game.load.image("particle", "assets/sprites/particle.png");
  },
  create: function () {
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.emitter = game.add.emitter(50, game.height / 2, 50);
    this.emitter.makeParticles("particle");
    this.emitter.gravity = 0;
    this.emitter.setXSpeed(0, 0);
    this.emitter.setYSpeed(0, 0);
    this.emitter.setAlpha(0.5, 1);
    this.emitter.minParticleScale = 0.5;
    this.emitter.maxParticleScale = 1;
    this.spaceship = game.add.sprite(50, game.height / 2, "spaceship");
    this.spaceship.anchor.set(0.5);
    game.physics.enable(this.spaceship, Phaser.Physics.ARCADE);
    game.input.onDown.add(this.startLevel, this);
  },
  startLevel: function () {
    this.spaceship.body.velocity.setTo(200, 0);
    this.spaceship.body.gravity.y = 1000;
    this.engineOn();
    this.emitter.start(false, 3000, 200);
    game.input.onDown.remove(this.startLevel, this);
    game.input.onDown.add(this.engineOn, this);
    game.input.onUp.add(this.engineOff, this);
  },
  engineOn: function () {
    this.spaceship.body.acceleration.y = -2000;
  },
  engineOff: function () {
    this.spaceship.body.acceleration.y = 0;
  },
  update: function () {
    this.emitter.x = this.spaceship.x;
    this.emitter.y = this.spaceship.y;
    if (this.spaceship.x > game.width + this.spaceship.width) {
      game.state.start("PlayGame");
    }
  }
}
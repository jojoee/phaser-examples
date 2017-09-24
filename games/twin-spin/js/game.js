var game;

var ballDistance = 160;
var rotationSpeed = 4;

window.onload = function () {
  game = new Phaser.Game(640, 960, Phaser.AUTO, "");
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame");
}

var playGame = function (game) {};

playGame.prototype = {
  preload: function () {
    game.load.image("firstball", "assets/firstball.png");
    game.load.image("secondball", "assets/secondball.png");
    game.load.image("arm", "assets/arm.png");
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  },
  create: function () {
    this.arm = game.add.sprite(game.width / 2, game.height / 2, "arm");
    this.arm.anchor.set(0, 0.5);
    this.balls = [
      game.add.sprite(game.width / 2, game.height / 2, "firstball"),
      game.add.sprite(game.width / 2, game.height / 2, "secondball")
    ]
    this.balls[0].anchor.set(0.5);
    this.balls[1].anchor.set(0.5);
    this.rotationAngle = 0;
    this.rotatingBall = 1;
    game.input.onDown.add(this.changeBall, this);
  },
  update: function () {
    this.rotationAngle = (this.rotationAngle + rotationSpeed * (this.rotatingBall * 2 - 1)) % 360;
    this.arm.angle = this.rotationAngle + 90;
    this.balls[this.rotatingBall].x = this.balls[1 - this.rotatingBall].x - ballDistance * Math.sin(Phaser.Math.degToRad(this.rotationAngle));
    this.balls[this.rotatingBall].y = this.balls[1 - this.rotatingBall].y + ballDistance * Math.cos(Phaser.Math.degToRad(this.rotationAngle));
  },
  changeBall: function () {
    this.arm.position = this.balls[this.rotatingBall].position
    this.rotatingBall = 1 - this.rotatingBall;
    this.rotationAngle = this.balls[1 - this.rotatingBall].position.angle(this.balls[this.rotatingBall].position, true) - 90;
  }
}
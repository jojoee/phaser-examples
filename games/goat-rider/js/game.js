var game;
var goat;
var player;
var targetX;
var isPressed = false;
var deltaSpeed = 10;
var rounds;
window.onload = function() {
  game = new Phaser.Game(800, 160, Phaser.AUTO, "");
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame");
}
var playGame = function(game) {};
playGame.prototype = {
  preload: function() {
    game.load.image("goat", "assets/goat.png");
    game.load.image("player", "assets/player.png");
  },
  create: function() {
    game.stage.backgroundColor = 0x74af21;
    rounds = -1;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    goat = game.add.sprite(game.width / 2, game.height, "goat");
    goat.anchor.set(0.5, 1);
    player = goat.addChild(game.make.sprite(0, -goat.height + 20, "player"));
    player.anchor.set(0.5, 1);
    game.physics.enable(goat, Phaser.Physics.ARCADE);
    game.input.onDown.add(function() {
      isPressed = true;
      if (rounds == -1) {
        if (game.rnd.between(0, 1) == 0) {
          goatLeft();
        } else {
          goatRight();
        }
      }
    });
    game.input.onUp.add(function() {
      isPressed = false;
    });
  },
  update: function() {
    if (player.x > -goat.width / 2 && player.x < goat.width / 2) {
      if ((goat.body.velocity.x > 0 && !isPressed) || (goat.body.velocity.x < 0 && isPressed)) {
        player.body.velocity.x = -goat.body.velocity.x
      } else {
        player.body.velocity.x = 0
      }
      if (goat.body.velocity.x > 0 && goat.x >= targetX) {
        goatLeft();
      }
      if (goat.body.velocity.x < 0 && goat.x <= targetX) {
        goatRight();
      }
    } else {
      goat.body.velocity.x = 0;
      player.body.velocity.x = 0;
    }
  }
}

function goatLeft() {
  rounds++;
  goat.body.velocity.x = game.rnd.between(-200 - deltaSpeed * rounds, -100 - deltaSpeed * rounds);
  targetX = game.rnd.between(goat.x - goat.width / 2, goat.width / 2);
  goat.tint = 0xffffff;
}

function goatRight() {
  rounds++;
  goat.body.velocity.x = game.rnd.between(100 + deltaSpeed * rounds, 200 + deltaSpeed * rounds);
  targetX = game.rnd.between(goat.x + goat.width, game.width - goat.width / 2);
  goat.tint = 0xff0000;
}
var boot = function(game) {
  console.log("%cStarting my awesome game", "color:white; background:red");
};
boot.prototype = {
  preload: function() {
    this.game.load.image("loading", "assets/loading.png");
  },
  create: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.setScreenSize();
    this.game.state.start("Preload");
  }
}
var gameTitle = function(game) {}
gameTitle.prototype = {
  create: function() {
    var gameTitle = this.game.add.sprite(160, 160, "gametitle");
    gameTitle.anchor.setTo(0.5, 0.5);
    var playButton = this.game.add.button(160, 320, "play", this.playTheGame, this);
    playButton.anchor.setTo(0.5, 0.5);
  },
  playTheGame: function() {
    this.game.state.start("TheGame");
  }
}
var gameOver = function(game) {}
gameOver.prototype = {
  init: function(score) {
    alert("You scored: " + score)
  },
  create: function() {
    var gameOverTitle = this.game.add.sprite(160, 160, "gameover");
    gameOverTitle.anchor.setTo(0.5, 0.5);
    var playButton = this.game.add.button(160, 320, "play", this.playTheGame, this);
    playButton.anchor.setTo(0.5, 0.5);
  },
  playTheGame: function() {
    this.game.state.start("TheGame");
  }
}
var preload = function(game) {}
preload.prototype = {
  preload: function() {
    var loadingBar = this.add.sprite(160, 240, "loading");
    loadingBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(loadingBar);
    this.game.load.spritesheet("numbers", "assets/numbers.png", 100, 100);
    this.game.load.image("gametitle", "assets/gametitle.png");
    this.game.load.image("play", "assets/play.png");
    this.game.load.image("higher", "assets/higher.png");
    this.game.load.image("lower", "assets/lower.png");
    this.game.load.image("gameover", "assets/gameover.png");
  },
  create: function() {
    this.game.state.start("GameTitle");
  }
}
var theGame = function(game) {
  spriteNumber = null;
  number = 0;
  workingButtons = true;
  higher = true;
  score = 0;
}
theGame.prototype = {
  create: function() {
    number = Math.floor(Math.random() * 10);
    spriteNumber = this.game.add.sprite(160, 240, "numbers");
    spriteNumber.anchor.setTo(0.5, 0.5);
    spriteNumber.frame = number;
    var higherButton = this.game.add.button(160, 100, "higher", this.clickedHigher, this);
    higherButton.anchor.setTo(0.5, 0.5);
    var lowerButton = this.game.add.button(160, 380, "lower", this.clickedLower, this);
    lowerButton.anchor.setTo(0.5, 0.5);
  },
  clickedHigher: function() {
    higher = true;
    this.tweenNumber(true);
  },
  clickedLower: function() {
    higher = false;
    this.tweenNumber(false);
  },
  tweenNumber: function(higher) {
    if (workingButtons) {
      workingButtons = false;
      var exitTween = this.game.add.tween(spriteNumber);
      exitTween.to({
        x: 420
      }, 500);
      exitTween.onComplete.add(this.exitNumber, this);
      exitTween.start();
    }
  },
  exitNumber: function() {
    spriteNumber.x = -180;
    spriteNumber.frame = Math.floor(Math.random() * 10);
    var enterTween = this.game.add.tween(spriteNumber);
    enterTween.to({
      x: 160
    }, 500);
    enterTween.onComplete.add(this.enterNumber, this);
    enterTween.start();
  },
  enterNumber: function() {
    workingButtons = true;
    if ((higher && spriteNumber.frame < number) || (!higher && spriteNumber.frame > number)) {
      this.game.state.start("GameOver", true, false, score);
    } else {
      score++;
      number = spriteNumber.frame;
    }
  }
}
var game;
var bgColors = [0x62bd18, 0xff5300, 0xd21034, 0xff475c, 0x8f16b2, 0x588c7e, 0x8c4646];
var holeWidthRange = [40, 240];
var wallRange = [10, 70];
var localStorageName = "squaregame";
var savedData;
window.onload = function () {
  var width = 640;
  var height = 960;
  var windowRatio = window.innerWidth / window.innerHeight;
  if (windowRatio < width / height) {
    var height = width / windowRatio;
  }
  game = new Phaser.Game(width, height, Phaser.AUTO, "");
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame");
}
var playGame = function (game) {};
playGame.prototype = {
  preload: function () {
    game.stage.disableVisibilityChange = true
    game.load.image("base", "assets/base.png");
    game.load.image("square", "assets/square.png");
    game.load.image("top", "assets/top.png");
    game.load.bitmapFont("font", "assets/font.png", "assets/font.fnt");
  },
  create: function () {
    savedData = localStorage.getItem(localStorageName) == null ? {
      level: 1
    } : JSON.parse(localStorage.getItem(localStorageName));
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    var tintColor = bgColors[game.rnd.between(0, bgColors.length - 1)];
    game.stage.backgroundColor = tintColor;
    this.leftSquare = game.add.sprite(0, game.height, "base");
    this.leftSquare.anchor.set(1, 1);
    this.rightSquare = game.add.sprite(game.width, game.height, "base");
    this.rightSquare.anchor.set(0, 1);
    this.leftWall = game.add.sprite(0, game.height - this.leftSquare.height, "top");
    this.leftWall.anchor.set(1, 1);
    this.rightWall = game.add.sprite(game.width, game.height - this.rightSquare.height, "top");
    this.rightWall.anchor.set(0, 1);
    this.square = game.add.sprite(game.width / 2, -400, "square");
    this.square.anchor.set(0.5);
    this.square.successful = 0;
    this.squareText = game.add.bitmapText(0, 0, "font", (savedData.level - this.square.successful).toString(), 120);
    this.squareText.anchor.set(0.5);
    this.squareText.tint = tintColor;
    this.square.addChild(this.squareText);
    this.levelText = game.add.bitmapText(game.width / 2, 0, "font", "level " + savedData.level, 60);
    this.levelText.anchor.set(0.5, 0);
    this.square.scale.setTo(0.2, 0.2);
    this.infoGroup = game.add.group();
    this.infoGroup.alpha = 0.4;
    this.updateLevel();
  },
  updateLevel: function () {
    this.squareText.text = (savedData.level - this.square.successful).toString();
    var holeWidth = game.rnd.between(holeWidthRange[0], holeWidthRange[1]);
    var wallWidth = game.rnd.between(wallRange[0], wallRange[1]);
    var leftSquareTween = game.add.tween(this.leftSquare).to({
      x: (game.width - holeWidth) / 2
    }, 500, Phaser.Easing.Cubic.Out, true);
    var rightSquareTween = game.add.tween(this.rightSquare).to({
      x: (game.width + holeWidth) / 2
    }, 500, Phaser.Easing.Cubic.Out, true);
    var leftWalltween = game.add.tween(this.leftWall).to({
      x: (game.width - holeWidth) / 2 - wallWidth
    }, 500, Phaser.Easing.Cubic.Out, true);
    var rightWallTween = game.add.tween(this.rightWall).to({
      x: (game.width + holeWidth) / 2 + wallWidth
    }, 500, Phaser.Easing.Cubic.Out, true);
    var squareTween = game.add.tween(this.square).to({
      y: 150,
      angle: 50
    }, 500, Phaser.Easing.Cubic.Out, true);
    squareTween.onComplete.add(function () {
      game.input.onDown.add(this.grow, this);
      this.rotateTween = game.add.tween(this.square).to({
        angle: 40
      }, 300, Phaser.Easing.Linear.None, true, 0, -1, true);
      if (this.infoGroup) {
        var targetSquare = game.add.sprite(game.width / 2, game.height - this.leftSquare.height, "square");
        targetSquare.width = holeWidth + wallWidth;
        targetSquare.height = holeWidth + wallWidth;
        targetSquare.alpha = 0.7;
        targetSquare.anchor.set(0.5, 1);
        this.infoGroup.add(targetSquare);
        var targetText = game.add.bitmapText(game.width / 2, targetSquare.y - targetSquare.height - 20, "font", "land here", 48);
        targetText.anchor.set(0.5, 1);
        this.infoGroup.add(targetText);
        var holdText = game.add.bitmapText(game.width / 2, 250, "font", "tap and hold to grow", 40);
        holdText.anchor.set(0.5, 0);
        this.infoGroup.add(holdText);
        var releaseText = game.add.bitmapText(game.width / 2, 300, "font", "release to drop", 40);
        releaseText.anchor.set(0.5, 0);
        this.infoGroup.add(releaseText);
      }
    }, this);
    var growTween = game.add.tween(this.square.scale).to({
      x: 0.2,
      y: 0.2
    }, 500, Phaser.Easing.Linear.None, true);
  },
  grow: function () {
    if (this.infoGroup) {
      this.infoGroup.destroy();
    }
    game.input.onDown.remove(this.grow, this);
    game.input.onUp.add(this.stop, this);
    this.growTween = game.add.tween(this.square.scale).to({
      x: 1,
      y: 1
    }, 1500, Phaser.Easing.Linear.None, true);
  },
  stop: function () {
    var message = "";
    game.time.events.add(300, function () {
      if (message) {
        this.levelText.text = message;
      }
    }, this);
    game.time.events.add(Phaser.Timer.SECOND * 2, function () {
      if (this.square.successful == savedData.level) {
        savedData.level++;
        localStorage.setItem(localStorageName, JSON.stringify({
          level: savedData.level
        }));
        game.state.start("PlayGame");
        return;
      }
      if (message) {
        game.state.start("PlayGame");
        return;
      }
      this.updateLevel();
    }, this);
    game.input.onUp.remove(this.stop, this);
    this.growTween.stop();
    this.rotateTween.stop();
    this.rotateTween = game.add.tween(this.square).to({
      angle: 0
    }, 300, Phaser.Easing.Cubic.Out, true);
    if (this.square.width <= this.rightSquare.x - this.leftSquare.x) {
      message = "Oh no!!";
      this.rotateTween.onComplete.add(function () {
        this.fallTween = game.add.tween(this.square).to({
          y: game.height + this.square.height
        }, 300, Phaser.Easing.Cubic.In, true);
      }, this);
    } else {
      if (this.square.width <= this.rightWall.x - this.leftWall.x) {
        var destY = game.height - this.leftSquare.height - this.square.height / 2;
        this.square.successful++;
      } else {
        var destY = game.height - this.leftSquare.height - this.leftWall.height - this.square.height / 2;
        message = "Oh no!!";
      }
      game.add.tween(this.square).to({
        y: destY
      }, 600, Phaser.Easing.Bounce.Out, true);
    }
  }
}
var GlobezGame = GlobezGame || {};
GlobezGame.Boot = function() {};
GlobezGame.Boot.prototype = {
  preload: function() {
    console.log("%cStarting Fish Vs Mines", "color:white; background:red");
    this.load.image("loading", "assets/sprites/loading.png");
    this.load.image("logo", "assets/sprites/logo.png");
  },
  create: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    // this.scale.setScreenSize(true);
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.start("Preload");
  }
}
var GlobezGame = GlobezGame || {};
GlobezGame.Preload = function() {};
GlobezGame.Preload.prototype = {
  preload: function() {
    console.log("%cPreloading assets", "color:white; background:red")
    var loadingBar = this.add.sprite(160, 340, "loading");
    loadingBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(loadingBar);
    var logo = this.add.sprite(160, 240, "logo");
    logo.anchor.setTo(0.5, 0.5);
    this.load.image("background", "assets/sprites/background.png");
    this.load.image("playbutton", "assets/sprites/playbutton.png");
    this.load.image("gametitle_sealife", "assets/sprites/gametitle_sealife.png");
    this.load.image("gametitle_vs", "assets/sprites/gametitle_vs.png");
    this.load.image("gametitle_mines", "assets/sprites/gametitle_mines.png");
    this.load.image("blackfade", "assets/sprites/blackfade.png");
    this.load.image("bubble", "assets/sprites/bubble.png");
  },
  create: function() {
    this.state.start("GameTitle");
  }
}
var GlobezGame = GlobezGame || {};
GlobezGame.GameTitle = function() {
  startGame = false;
};
GlobezGame.GameTitle.prototype = {
  create: function() {
    console.log("%cStarting game title", "color:white; background:red");
    this.add.image(0, 0, "background");
    //
    var bubblesEmitter = this.add.emitter(160, 500, 50);
    bubblesEmitter.makeParticles("bubble");
    bubblesEmitter.maxParticleScale = 0.6;
    bubblesEmitter.minParticleScale = 0.2;
    bubblesEmitter.setYSpeed(-30, -40);
    bubblesEmitter.setXSpeed(-3, 3);
    bubblesEmitter.gravity = 0;
    bubblesEmitter.width = 320;
    bubblesEmitter.minRotation = 0;
    bubblesEmitter.maxRotation = 40;
    bubblesEmitter.flow(15000, 2000)
      //
    var gameTitleSeaLife = this.add.image(160, 70, "gametitle_sealife");
    gameTitleSeaLife.anchor.setTo(0.5, 0.5);
    gameTitleSeaLife.angle = (2 + Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1);
    var seaLifeTween = this.add.tween(gameTitleSeaLife);
    seaLifeTween.to({
      angle: -gameTitleSeaLife.angle
    }, 5000 + Math.random() * 5000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    //
    var gameTitleVs = this.add.image(190, 120, "gametitle_vs");
    gameTitleVs.anchor.setTo(0.5, 0.5);
    gameTitleVs.angle = (2 + Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1);
    var vsTween = this.add.tween(gameTitleVs);
    vsTween.to({
      angle: -gameTitleVs.angle
    }, 5000 + Math.random() * 5000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    //
    var gameTitleMines = this.add.image(160, 160, "gametitle_mines");
    gameTitleMines.anchor.setTo(0.5, 0.5);
    gameTitleMines.angle = (2 + Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1);
    var minesTween = this.add.tween(gameTitleMines);
    minesTween.to({
      angle: -gameTitleMines.angle
    }, 5000 + Math.random() * 5000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    //
    var playButton = this.add.button(160, 320, "playbutton", this.playTheGame, this)
    playButton.anchor.setTo(0.5, 0.5);
    playButton.angle = (2 + Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1);
    var playTween = this.add.tween(playButton);
    playTween.to({
      angle: -playButton.angle
    }, 5000 + Math.random() * 5000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    //
    var blackFade = this.add.sprite(0, 0, "blackfade");
    var fadeTween = this.add.tween(blackFade);
    fadeTween.to({
      alpha: 0
    }, 2000, Phaser.Easing.Cubic.Out, true);
  },
  playTheGame: function() {
    if (!startGame) {
      startGame = true
      alert("Start the game!!");
    }
  }
}
var GlobezGame = GlobezGame || {};
GlobezGame.gameOptions = {
  gameWidth: 320,
  gameHeight: 480
}
GlobezGame.game = new Phaser.Game(GlobezGame.gameOptions.gameWidth, GlobezGame.gameOptions.gameHeight, Phaser.CANVAS, "");
GlobezGame.game.state.add("Boot", GlobezGame.Boot);
GlobezGame.game.state.add("Preload", GlobezGame.Preload);
GlobezGame.game.state.add("GameTitle", GlobezGame.GameTitle);
GlobezGame.game.state.start("Boot");

boot = {
  init: function() {
    game.log();
  },
  preload: function() {
    game.load.image("loading", "assets/sprites/loading.png");
    game.load.image("logo", "assets/sprites/logo.png");
  },
  create: function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.setScreenSize(true);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start("Loading");
  }
};
loading = {
  init: function() {
    game.log();
  },
  preload: function() {
    var loadingBar = game.add.sprite(320, 560, "loading");
    loadingBar.anchor.setTo(0.5);
    game.load.setPreloadSprite(loadingBar);
    var logo = game.add.sprite(320, 480, "logo").anchor.setTo(0.5);
    game.load.image("background", "assets/sprites/background.png");
    game.load.image("snow_mask", "assets/sprites/snow_mask.png");
    game.load.image("gametitle", "assets/sprites/gametitle.png");
    game.load.image("gamesubtitle", "assets/sprites/gamesubtitle.png");
    game.load.image("blackfade", "assets/sprites/blackfade.png");
    game.load.spritesheet("snowflakes", "assets/sprites/snowflakes.png", 17, 17);
    game.load.spritesheet("snowflakes_large", "assets/sprites/snowflakes_large.png", 64, 64);
    this.load.audio("music", "assets/sounds/music.mp3");
  },
  create: function() {
    game.state.start("GameTitle");
  }
}
var title;
var subtitle;
gameTitle = {
  init: function() {
    game.log();
  },
  create: function() {
    game.add.image(0, 0, "background");
    //
    backSnow = game.add.emitter(320, -32, 600);
    backSnow.makeParticles("snowflakes", [0, 1, 2, 3, 4, 5]);
    backSnow.maxParticleScale = 0.6;
    backSnow.minParticleScale = 0.2;
    backSnow.setYSpeed(20, 100);
    backSnow.setXSpeed(-15, 15);
    backSnow.gravity = 0;
    backSnow.width = 960;
    backSnow.minRotation = 0;
    backSnow.maxRotation = 40;
    backSnow.start(false, 14000, 20);
    //
    game.add.image(0, 415, "snow_mask");
    title = game.add.sprite(-320, 170, "gametitle");
    title.anchor.setTo(0.5);
    subtitle = game.add.image(960, 270, "gamesubtitle");
    subtitle.anchor.setTo(0.5);
    game.time.events.add(Phaser.Timer.SECOND * 4, this.showTitle, this);
    //
    music = game.add.audio("music", 1, true);
    music.play("", 0, 1, true);
    //
    frontSnow = game.add.emitter(320, -32, 50);
    frontSnow.makeParticles("snowflakes_large", [0, 1, 2, 3, 4, 5]);
    frontSnow.maxParticleScale = 0.75;
    frontSnow.minParticleScale = 0.5;
    frontSnow.setYSpeed(50, 150);
    frontSnow.setXSpeed(-20, 20);
    frontSnow.gravity = 0;
    frontSnow.width = 960;
    frontSnow.minRotation = 0;
    frontSnow.maxRotation = 40;
    frontSnow.start(false, 14000, 1000);
    //
    var blackFade = game.add.sprite(0, 0, "blackfade");
    var fadeTween = this.add.tween(blackFade);
    fadeTween.to({
      alpha: 0
    }, 4000, Phaser.Easing.Linear.Out, true);
  },
  showTitle: function() {
    var titleTween = game.add.tween(title);
    titleTween.to({
      x: 320
    }, 2000, Phaser.Easing.Cubic.Out, true);
    titleTween.onComplete.add(function() {
      var subtitleTween = game.add.tween(subtitle);
      subtitleTween.to({
        x: 390
      }, 2000, Phaser.Easing.Cubic.Out, true);
    });
  }
}
var game = new Phaser.Game(640, 960, Phaser.CANVAS, "");
game.log = function() {
  console.log("%c  Running " + game.state.getCurrentState().state.current + " state  ", "color:white;background:red");
}
game.state.add("Boot", boot);
game.state.add("Loading", loading);
game.state.add("GameTitle", gameTitle);
game.state.start("Boot");
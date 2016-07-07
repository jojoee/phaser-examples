Candy.Preloader = function(game) {
  // define width and height of the game
  Candy.GAME_WIDTH = 640;
  Candy.GAME_HEIGHT = 960;
};
Candy.Preloader.prototype = {
  preload: function() {
    // set background color and preload image
    this.stage.backgroundColor = '#B4D9E7';
    this.preloadBar = this.add.sprite((Candy.GAME_WIDTH - 311) / 2, (Candy.GAME_HEIGHT - 27) / 2, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);
    // load images
    this.load.image('background', ASSET_PATH + 'background.png');
    this.load.image('floor', ASSET_PATH + 'floor.png');
    this.load.image('monster-cover', ASSET_PATH + 'monster-cover.png');
    this.load.image('title', ASSET_PATH + 'title.png');
    this.load.image('game-over', ASSET_PATH + 'gameover.png');
    this.load.image('score-bg', ASSET_PATH + 'score-bg.png');
    this.load.image('button-pause', ASSET_PATH + 'button-pause.png');
    // load spritesheets
    this.load.spritesheet('candy', ASSET_PATH + 'candy.png', 82, 98);
    this.load.spritesheet('monster-idle', ASSET_PATH + 'monster-idle.png', 103, 131);
    this.load.spritesheet('button-start', ASSET_PATH + 'button-start.png', 401, 143);
  },
  create: function() {
    // start the MainMenu state
    this.state.start('MainMenu');
  }
};
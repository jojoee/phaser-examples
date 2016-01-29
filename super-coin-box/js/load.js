(function(Phaser){
  'use strict';

  function loadState(){}

  loadState.prototype = {

    preload: function(){
      var loadingLabel = this.game.add.text(this.game.world.centerX, 150, 'loading...',
        {font: '25px Arcade', fill: '#fff'});
      loadingLabel.anchor.setTo(0.5, 0.5);

      var progressBar = this.game.add.sprite(this.game.world.centerX, 200, 'progressBar');
      progressBar.anchor.setTo(0.5, 0.5);

      this.game.load.setPreloadSprite(progressBar);

      this.game.load.atlas('gameElements', 'assets/images/game-spritesheet.png', 'assets/images/game-sprites.json');

      this.game.load.image('tileset', 'assets/images/tileset.png');
      this.game.load.tilemap('map', 'assets/images/map.json', null, Phaser.Tilemap.TILED_JSON);

      this.game.load.audio('jump', ['assets/sounds/jump.ogg', 'assets/sounds/jump.mp3']);
      this.game.load.audio('coin', ['assets/sounds/coin.ogg', 'assets/sounds/coin.mp3']);
      this.game.load.audio('dead', ['assets/sounds/dead.ogg', 'assets/sounds/dead.mp3']);
      this.game.load.audio('enemyKill', ['assets/sounds/kill_the_enemy.ogg', 'assets/sounds/kill_the_enemy.mp3']);

      if(!this.game.device.desktop){
        this.game.load.atlas('controlsElements', 'assets/images/controls-spritesheet.png', 'assets/images/controls-sprites.json');
      }
      else{
        this.game.load.audio('intro', ['assets/sounds/intro.ogg', 'assets/sounds/intro.mp3']);
      }
    },

    create: function(){
      this.game.state.start('menu');
    }

  };

  window['super-coin-box'] = window['super-coin-box'] || {};
  window['super-coin-box'].loadState = loadState;

})(Phaser);

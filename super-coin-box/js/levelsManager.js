(function(Phaser){
  'use strict';
  Phaser.Plugin.levelsManager = function(game, parent){
    Phaser.Plugin.call(this, game, parent);
    //settings by default
    this._settings = {
      level: 1,
      levels: 99,
      prefix: 'level_',
      collisionMap: {}
    };
    this.map = undefined;
    this.layer = undefined;

  };

  Phaser.Plugin.levelsManager.prototype = Object.create(Phaser.Plugin.prototype);
  Phaser.Plugin.levelsManager.prototype.constructor = Phaser.Plugin.levelsManager;


  /**
  * Change default settings object values with passed object value.
  *
  * @method Phaser.Plugin.ScreenShake#setup
  * @param {object} [obj] - Passed object to merge
  */
  Phaser.Plugin.levelsManager.prototype.setup = function(obj){
    this._settings = Phaser.Utils.extend(false, this._settings, obj);
  };

  Phaser.Plugin.levelsManager.prototype.init = function(map){
    this.map = map;
  };

  Phaser.Plugin.levelsManager.prototype.levelTransition = function(){
    if(++this._settings.level > this._settings.levels){
      this.gameOver();
    }
    else{
      this.onChangeLevel();
    }
  };

  Phaser.Plugin.levelsManager.prototype.onChangeLevel = function(){
    var bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
    bitmap.context.fillStyle = '#87bbdd';
    bitmap.context.fillRect(0, 0, this.game.width, this.game.height);

    this.cover = this.game.add.sprite(0, 0, bitmap);
    this.cover.alpha = 0;
    this.cover.bringToTop();

    this.levelLabel = this.game.add.text(this.game.world.centerX, this.game.world.height - 210,
        'Level ' + this._settings.level,
        {font: '60px Arcade', fill: '#fff'});

    this.levelLabel.anchor.setTo(0.5, 0.5);
    this.levelLabel.alpha = 0;


    this.readyLabel= this.game.add.text(this.game.world.centerX, this.game.world.height - 110,
      'get ready..',
      { font: '25px Arcade', fill: '#fff' });

    this.readyLabel.anchor.setTo(0.5, 0.5);
    this.readyLabel.alpha = 0;

    this.game.add.tween(this.cover)
    .to({alpha: 1}, 1000, Phaser.Easing.Linear.OutIn)
    .to({alpha: 0}, 1000, Phaser.Easing.Linear.InOut, false, 1500)
    .start();

    this.game.add.tween(this.levelLabel)
    .to({alpha: 1}, 1000, Phaser.Easing.Linear.OutIn)
    .to({alpha: 0}, 1000, Phaser.Easing.Linear.InOut, false, 1000)
    .start();

    this.game.add.tween(this.readyLabel)
    .to({alpha: 1}, 1000, Phaser.Easing.Linear.OutIn)
    .to({alpha: 0}, 1000, Phaser.Easing.Linear.InOut, false, 1000)
    .start();
  };

  Phaser.Plugin.levelsManager.prototype.createLevel = function(colides, recalculate){
    var layerName = this.getLevelName();
    if(this.layer !== undefined){
      this.layer.destroy();
      this.layer = undefined;
    }
    this.layer = this.map.createLayer(layerName);
    var indexes = this._settings.collisionMap[this._settings.level];
    this.layer.resizeWorld();
    this.map.setCollision(indexes, colides, layerName, recalculate);
    return this.layer;
  };

  Phaser.Plugin.levelsManager.prototype.gameOver = function(){
    this.game.state.start('gameOver');
  };

  Phaser.Plugin.levelsManager.prototype.getLevelName = function(){
    return this._settings.prefix + this._settings.level;
  };

})(Phaser);

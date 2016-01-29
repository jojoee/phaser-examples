(function(Phaser){
  'use strict';

  function gameOverState(){}

  gameOverState.prototype = {

    create: function(){
      this.initTitle();
      this.initScore();

      if(this.game.device.desktop){
        var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.addOnce(this.start, this);
      }
      else{
        this.game.sound.mute = true;
        this.game.input.onDown.addOnce(this.start, this); //for mobile devices
      }
    },

    start: function(){
      this.game.state.start('menu');
    },

    initTitle: function(){
      var nameLabel = this.game.add.text(this.game.world.centerX, -50,
        'Game Over',
        {font: '60px Arcade', fill: '#fff'});
      nameLabel.anchor.setTo(0.5, 0.5);

      //game title animation
      var nameLabelTween = this.game.add.tween(nameLabel);
      nameLabelTween
      .to({y: 80}, 1000)
      .easing(Phaser.Easing.Bounce.Out)
      .start();
    },

    initScore: function(){
      this.initBestScore();
      var startText;
      if(this.game.device.desktop){
        startText = 'press the up arrow key to start';
      }
      else{
        startText = 'touch the screen to start';
      }

      var scoreLabel= this.game.add.text(this.game.world.centerX, this.game.world.centerY,
        'score: ' + this.game.global.score +
        '\nbest score: ' + this.bestScoreValue,
        { font: '25px Arcade', fill: '#fff', align: 'center' });
      scoreLabel.anchor.setTo(0.5, 0.5);

      var startLabel= this.game.add.text(this.game.world.centerX, this.game.world.height - 110,
        startText,
        { font: '25px Arcade', fill: '#fff' });
      startLabel.anchor.setTo(0.5, 0.5);
      startLabel.alpha = 0;

      this.game.add.tween(startLabel).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    },

    initBestScore: function(){
      var storagePrefix = 'super-coin-box::';
      var bestScore = storagePrefix + 'bestScore';
      this.bestScoreValue = localStorage.getItem(bestScore);

      if(!this.bestScoreValue){
        localStorage.setItem(bestScore, 0);
        this.bestScoreValue = 0;
      }

      if(this.game.global.score > this.bestScoreValue){
        localStorage.setItem(bestScore, this.game.global.score);
        this.bestScoreValue = this.game.global.score;
      }
    },



    createBackground:function(){
      //gradient
      var bitmap = this.game.add.bitmapData(500, 340);
      var gradient = bitmap.context.createLinearGradient(0, 0, 0, 340);
      gradient.addColorStop(0, '#3498db');
      gradient.addColorStop(0.7, '#5eaadd');
      gradient.addColorStop(1, '#87bbdd');
      bitmap.context.fillStyle = gradient;
      bitmap.context.fillRect(0, 0, 500, 340);
      this.game.add.sprite(0, 0, bitmap);
    }
  };

  window['super-coin-box'] = window['super-coin-box'] || {};
  window['super-coin-box'].gameOverState = gameOverState;

})(Phaser);

(function(Phaser){
  'use strict';

  function menuState(){}

  menuState.prototype = {

    create: function(){
      this.createMoovie();
      this.initMuteButton();
      this.initTitle();
      this.initScore();
      this.playMusic();

      if(this.game.device.desktop){
        var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.addOnce(this.start, this);
      }
      else{
        this.game.sound.mute = true;
        this.game.input.onDown.addOnce(this.start, this); //for mobile devices
      }
    },

    update: function(){
      this.game.physics.arcade.collide(this.introPlayer, this.introLayer);
      this.game.physics.arcade.collide(this.introCoin, this.introLayer);
      this.game.physics.arcade.overlap(this.introPlayer, this.introCoin, this.grabCoin, null, this);
      this.playMoovie();
    },

    start: function(){
      this.stopMusic();
      this.game.state.start('game');
    },

    initMuteButton: function(){
      if(!this.game.device.desktop){
        return;
      }
      this.muteButton = this.game.add.button(20, 20, 'gameElements', this.toggleSound, this);
      this.muteButton.frameName = 'muteButton-01';
      this.muteButton.input.useHandCursor = true;

      var muteKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
      muteKey.onDown.add(this.toggleSound, this);

      if(this.game.sound.mute){
        this.muteButton.frameName = 'muteButton-02';
      }
    },

    toggleSound: function(){
      this.game.sound.mute = !this.game.sound.mute;
      this.muteButton.frameName = this.game.sound.mute ? 'muteButton-02' : 'muteButton-01';
    },

    initTitle: function(){
      var nameLabel = this.game.add.text(this.game.world.centerX, -50,
        'Super Coin Box',
        {font: '60px Arcade', fill: '#fff'});
      nameLabel.anchor.setTo(0.5, 0.5);

      //game title animation
      var nameLabelTween = this.game.add.tween(nameLabel);
      nameLabelTween
      .to({y: 80}, 1000)
      .easing(Phaser.Easing.Bounce.Out)
      .start();

      if(this.game.device.desktop){
        //mute hint
        var muteLabel = this.game.add.text(150, this.game.world.height - 10,
          'press M button or click on the volume icon to toggle sound',
          { font: '11px Arial', fill: '#fff' });
        muteLabel.anchor.setTo(0.5, 0.5);
      }
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

    playMusic: function(){
      if(!this.game.device.desktop){
        return;
      }
      this.introMusic = this.game.add.audio('intro', 1, true);
      this.introMusic.volume = 0.5;
      this.introMusic.loop = true;
      this.introMusic.play();
    },

    stopMusic: function(){
      if(this.introMusic){
        this.introMusic.stop();
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
    },

    createMoovie: function(){
      this.createBackground();
      /* Player */
      this.introPlayer = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'gameElements', 'player-01');
      this.game.physics.arcade.enable(this.introPlayer);

      this.introPlayer.alpha = 1;
      this.introPlayer.anchor.setTo(0.5, 1);
      this.introPlayer.body.gravity.y = 500;
      this.introPlayer.body.velocity.x = 100 * Phaser.Math.randomSign();
      this.introPlayer.body.bounce.x = 1;
      this.introPlayer.checkWorldBounds = true;
      this.introPlayer.outOfBoundsKill = true;

      this.introPlayer.animations.add('right', ['player-02', 'player-03'], 8, true);
      this.introPlayer.animations.add('left', ['player-04', 'player-05'], 8, true);

      this.time.events.repeat(2000, 9999, function(){
        //jump player every 2 sec
        this.introPlayer.body.velocity.y = -200;
      }, this);

      this.time.events.add(2500, function(){
        /* Coin */
        this.introCoin = this.game.add.sprite(this.game.world.centerX + this.getRandomX(), 80, 'gameElements', 'coin');
        this.game.physics.arcade.enable(this.introCoin);
        this.introCoin.body.gravity.y = 500;
        this.introCoin.anchor.setTo(1, 0.5);
        this.introCoin.checkWorldBounds = true;
        this.introCoin.outOfBoundsKill = true;
      }, this);

      /* World */
      var introMap = this.game.add.tilemap('map');
      introMap.addTilesetImage('tileset');
      this.introLayer = introMap.createLayer('menu');
      this.introLayer.resizeWorld();
      introMap.setCollision([1,3], true, 'menu');

      /* Clouds */
      this.clouds = [
        this.game.add.sprite(this.game.world.centerX - 200, this.game.world.centerY - 110, 'gameElements', 'cloud-01'),
        this.game.add.sprite(this.game.world.centerX + 70, this.game.world.centerY - 120, 'gameElements', 'cloud-02'),
        this.game.add.sprite(this.game.world.centerX - 70, this.game.world.centerY - 80, 'gameElements', 'cloud-03'),
      ];
      var cloudsCnt = this.clouds.length;

      for(var i = 0; i < cloudsCnt; i++){
        this.clouds[i].alpha = 0.4;
        this.game.physics.arcade.enable(this.clouds[i]);
        this.clouds[i].body.velocity.x = 50 + ((i % 2) ? i*2: i*3);
      }
    },

    playMoovie: function(){
      if(this.introPlayer.body.velocity.x > 0){
        this.introPlayer.animations.play('right');
      }
      else if(this.introPlayer.body.velocity.x < 0){
        this.introPlayer.animations.play('left');
      }
      else{
        this.introPlayer.animations.stop();
        this.introPlayer.frameName = 'player-01';
      }

      /* Reset clouds position */
      var cloudsCnt = this.clouds.length;
      for(var i = 0; i < cloudsCnt; i++){
        if(!this.clouds[i].inWorld){
          this.clouds[i].x = -20;
          this.clouds[i].body.velocity.x = 50 + ((i % 2) ? i*2: i*3);
        }
      }
    },

    grabCoin: function(){
      //reset coin position
      this.introCoin.reset(this.game.world.centerX + this.getRandomX(), 80);
      this.game.add.tween(this.introPlayer.scale)
        .to({x:1.3, y:1.3}, 50)
        .to({x:1, y:1}, 150)
        .start();
    },

    getRandomX: function(){
      return this.game.rnd.integerInRange(0, 130) * Phaser.Math.randomSign();
    }
  };

  window['super-coin-box'] = window['super-coin-box'] || {};
  window['super-coin-box'].menuState = menuState;

})(Phaser);

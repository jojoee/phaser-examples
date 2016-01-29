(function(Phaser){
  'use strict';

  function gameState(){}

  gameState.prototype = {

    create: function(){
      this.createBackground();
      this.addGlobalVars(); //some global vars init
      this.initSounds();
      this.addControls(); //create move actions
      this.createWorld();
      this.createPlayer();
      this.createEnemies();
      this.createCoin();
      this.createExplosion();
      this.displayScore();
      this.displayLives();
      this.initMobileControls(); //display virtual keyboard for mobile devices
    },

    update: function(){
      this.game.physics.arcade.collide(this.player, this.layer);
      this.game.physics.arcade.collide(this.enemies, this.layer, this.enemyVsLayer, null, this);
      this.game.physics.arcade.collide(this.player, this.enemies, this.playerVsEnemy, null, this);
      this.game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
      this.movePlayer();
      this.enemyVsNothing();
      this.resetCloudsPosition();

      if(!this.player.inWorld){
        this.playerDie();
      }

      if(this.player.body.x < 1 || this.player.body.x > this.game.world.width - 20){
        this.playerDie();
      }

      if(this.nextEnemy < this.game.time.now){
        var start = 4000; //easiest dificulty (add enemies every 4 seconds)
        var end = 1000; //hardest dificulty (add enemies every 1 second)
        var score = 100; //hardest dificulty when the player has 100+ pts score
        var delay = Math.max(start - (start - end) * this.game.global.score / score, end); //formula for linear increas dificulty

        this.addEnemy();
        this.nextEnemy = this.game.time.now + delay;
      }
    },

    createPlayer: function(){
      this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'gameElements', 'player-01');
      this.game.physics.arcade.enable(this.player);
      this.player.anchor.setTo(0.5, 0.5);
      this.player.body.gravity.y = 500;

      this.player.animations.add('right', ['player-02', 'player-03'], 8, true);
      this.player.animations.add('left', ['player-04', 'player-05'], 8, true);
    },

    movePlayer: function() {
      if (this.cursor.left.isDown || this.altKeys.left.isDown || this.moveLeft) {
        this.player.body.velocity.x = -200;
        this.player.animations.play('left');
      }
      else if (this.cursor.right.isDown || this.altKeys.right.isDown || this.moveRight) {
        this.player.body.velocity.x = 200;
        this.player.animations.play('right');
      }
      else {
        this.player.body.velocity.x = 0;
        this.player.animations.stop();
        this.player.frameName = 'player-01';
      }

      if (this.cursor.up.isDown || this.altKeys.up.isDown) {
        this.jumpPlayer();
      }
    },

    jumpPlayer: function(){
      if(this.player.body.onFloor()){
        this.player.body.velocity.y = -300;
        this.jumpSound.play();
      }
    },

    playerVsEnemy: function(player, enemy){
      if(player.body.touching.down && enemy.body.touching.up){
        this.enemyDie(enemy);
      }
      else{
        this.playerDie(enemy);
      }
    },

    respawnEnemy: function(enemy){
      enemy.kill();
      this.addEnemy();
    },

    enemyDie: function(enemy){
      var tweenEnemy = this.game.add.tween(enemy);
      tweenEnemy.to({alpha: 0}, 400, Phaser.Easing.Linear.None, true);
      this.time.events.add(300, function(){
        tweenEnemy.stop();
        this.respawnEnemy(enemy);
      }, this);

      this.player.body.velocity.y = -100;
      this.enemyKillSound.play();
      this.updateScore(2);
      this.updateScoreText();
      this.game.plugins.screenShake.setup({
        shakeX: false,
        shakeY: true
      });
      this.game.plugins.screenShake.shake(5);
    },

    playerDie: function(enemy){
      if(!this.player.alive){
        return;
      }
      if(typeof enemy !== 'undefined'){
        this.enemyStop(enemy);
      }
      this.player.kill();
      this.game.global.playerLives -= 1;
      this.deadSound.play();
      this.jumpSound.stop();
      this.startExplosion();
      this.game.plugins.screenShake.setup({
        shakeX: true,
        shakeY: true
      });
      this.game.plugins.screenShake.shake(10);

      this.time.events.add(1000, function(){
        if(this.game.global.playerLives < 1){
          this.game.state.start('gameOver');
        }
        else{
          this.player.reset(this.game.world.centerX, this.game.world.centerY);
          this.updateLives();

          this.enemies.destroy(false);
          this.createEnemies();
          this.respawnCoin();
        }
      }, this);
    },

    createWorld: function(){
      this.map = this.game.add.tilemap('map');
      this.map.addTilesetImage('tileset');
      this.game.plugins.levelsManager.init(this.map);
      this.layer = this.game.plugins.levelsManager.createLevel(true);
    },

    createCoin: function(){
      var randomPos = this.getCoinRandomPosition();
      this.coin = this.game.add.sprite(randomPos.x, randomPos.y, 'gameElements', 'coin');
      this.game.physics.arcade.enable(this.coin);
      this.coin.anchor.setTo(0.5, 0.5);
    },

    respawnCoin: function(){
      this.coin.kill();
      this.createCoin();
    },

    takeCoin: function(){
      this.updateScore(5);
      this.updateScoreText();
      this.updateCoinPosition();
      this.coinSound.play();

      /* Animations */
      //scale up/down the player when he got the coin
      this.game.add.tween(this.player.scale)
      .to({x:1.3, y:1.3}, 50)
      .to({x:1, y:1}, 150)
      .start();
    },

    getPossibleCoinCoordinates: function(){
      return {
        '1': [
          {x: 140, y: 70}, {x: 250, y: 30}, {x: 360, y: 70},
          {x: 60, y: 150}, {x: 250, y: 130}, {x: 440, y: 150},
          {x: 110, y: 230}, {x: 380, y: 230},
          {x: 90, y: 310}, {x: 250, y: 270}, {x: 350, y: 310},
        ],
        '2': [
          {x: 130, y: 50}, {x: 250, y: 70}, {x: 370, y: 50},
          {x: 30, y: 70}, {x: 190, y: 90}, {x: 310, y: 90}, {x: 470, y: 70},
          {x: 30, y: 130}, {x: 150, y: 150}, {x: 210, y: 170}, {x: 290, y: 170}, {x: 350, y: 150}, {x: 450, y: 130},
          {x: 30, y: 190}, {x: 70, y: 230}, {x: 110, y: 250}, {x: 190, y: 230}, {x: 310, y: 230}, {x: 430, y: 230}, {x: 470, y: 190},
          {x: 50, y: 310}, {x: 170, y: 310}, {x: 350, y: 310}, {x: 450, y: 310},
        ],
        '3': [
          {x: 50, y: 50}, {x: 110, y: 70}, {x: 250, y: 70}, {x: 390, y: 70}, {x: 450, y: 50},
          {x: 30, y: 150}, {x: 150, y: 150}, {x: 210, y: 110}, {x: 290, y: 110}, {x: 250, y: 150}, {x: 390, y: 150}, {x: 470, y: 150},
          {x: 50, y: 210}, {x: 90, y: 190}, {x: 190, y: 230}, {x: 310, y: 230}, {x: 430, y: 190}, {x: 450, y: 210},
          {x: 30, y: 270}, {x: 30, y: 310}, {x: 110, y: 310}, {x: 390, y: 310}, {x: 470, y: 270},
          ],
        '4': [
          {x: 70, y: 50}, {x: 170, y: 50}, {x: 370, y: 50}, {x: 430, y: 50},
          {x: 30, y: 110}, {x: 130, y: 130}, {x: 250, y: 90}, {x: 370, y: 130}, {x: 470, y: 110},
          {x: 30, y: 170}, {x: 210, y: 170}, {x: 390, y: 130}, {x: 470, y: 170},
          {x: 10, y: 250}, {x: 130, y: 230}, {x: 250, y: 270}, {x: 370, y: 230}, {x: 490, y: 250},
          {x: 30, y: 310}, {x: 130, y: 310}, {x: 370, y: 310}, {x: 470, y: 310},
        ],
        '5': [
          {x: 10, y: 130}, {x: 90, y: 70}, {x: 210, y: 70},
          {x: 310, y: 70}, {x: 430, y: 70}, {x: 490, y: 130},
          {x: 250, y: 130}, {x: 150, y: 130}, {x: 350, y: 130},
          {x: 90, y: 190}, {x: 310, y: 190}, {x: 430, y: 190},
          {x: 10, y: 250}, {x: 150, y: 250}, {x: 250, y: 250},
          {x: 350, y: 250}, {x: 490, y: 250}, {x: 10, y: 310},
          {x: 150, y: 310}, {x: 350, y: 310}, {x: 490, y: 310},
        ]
      };
    },

    getCoinRandomPosition: function(){
      this.coinPos = this.getPossibleCoinCoordinates()[this.game.global.currentLevel];
      return this.coinPos[this.game.rnd.integerInRange(0, this.coinPos.length - 1)];
    },

    updateCoinPosition: function(){
      if(!this.coinPos.length){
        this.coinPos = this.getPossibleCoinCoordinates()[this.game.global.currentLevel];
      }

      for (var i = 0; i < this.coinPos.length; i++){
        if(this.coinPos[i].x === this.coin.x){
          this.coinPos.splice(i, 1);
        }
      }

      var newPos = this.getCoinRandomPosition();
      this.coin.reset(newPos.x, newPos.y);
      /* Animations */
      //smoothly appears the coin on new pos
      this.coin.scale.setTo(0, 0);
      this.game.add.tween(this.coin.scale)
      .to({x: 1, y: 1}, 300).
      start();
    },

    createEnemies: function(){
      this.enemies = this.game.add.group();
      this.enemies.enableBody = true;
      this.enemies.createMultiple(10, 'gameElements', 'enemy-01');
    },

    addEnemy: function(){
      var enemy = this.enemies.getFirstDead();
      if(!enemy){
        return;
      }

      enemy.alpha = 1;
      enemy.anchor.setTo(0.5, 1);
      enemy.reset(this.game.world.centerX, 0);
      enemy.body.gravity.y = 500;
      enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
      enemy.body.bounce.x = 1;
      enemy.checkWorldBounds = true;
      enemy.outOfBoundsKill = true;

      enemy.animations.add('right', ['enemy-02', 'enemy-03'], 8, true);
      enemy.animations.add('left', ['enemy-04', 'enemy-05'], 8, true);

      if(enemy.body.velocity.x > 0){
        enemy.animations.play('left');
      }
      else if(enemy.body.velocity.x < 0){
        enemy.animations.play('right');
      }
      else{
        enemy.animations.stop();
        enemy.frameName = 'enemy-01';
      }

      this.time.events.repeat(this.game.rnd.integerInRange(2000, 6000), 9999, function(){
        enemy.body.velocity.y = -300;
        if(enemy.body.y < 0){
          this.respawnEnemy(enemy);
        }
      }, this);
    },

    enemyVsLayer: function(enemy, layer){
      if(enemy.body.velocity.x > 0){
        enemy.animations.play('right');
      }
      else{
        enemy.animations.play('left');
      }
    },

    enemyVsNothing: function(){
      this.enemies.forEach(function(enemy){
        if(enemy.alive){
          if(enemy.body.x < 1 || enemy.body.x > this.game.world.width - 20){
            if(enemy.body.x < 1){
              enemy.body.x = 1;
            }
            else if(enemy.body.x > this.game.world.width - 20){
              enemy.body.x = this.game.world.width - 20;
            }

            enemy.body.velocity.x = - enemy.body.velocity.x;
          }

          if(!enemy.inWorld || enemy.body.y > this.game.world.height){
            enemy.kill();
          }
        }
      }.bind(this));
    },

    enemyStop: function(enemy){
      enemy.body.velocity.x = 0; //stop enemy
      enemy.body.velocity.y = 0; //stop enemy
      enemy.animations.paused = true;
      enemy.frameName = 'enemy-01';
    },

    createExplosion: function(){
      /* Explode the player when he hits the enemy */
      this.emitter = this.game.add.emitter(0, 0, 15);
      this.emitter.makeParticles('gameElements', 'pixel');
      this.emitter.setYSpeed(-150, 150);
      this.emitter.setXSpeed(-150, 150);
      this.emitter.gravity = 0;
    },

    startExplosion: function(){
      this.emitter.x = this.player.x;
      this.emitter.y = this.player.y;
      this.emitter.start(true, 600, null, 15);
    },

    displayScore: function(){
      this.scoreLabel = this.game.add.text(30, 30, 'score: 0', { font: '21px Arcade', fill: '#ffffff' });
      // Initialise the score variable
      this.game.global.score = 0;
    },

    updateScoreText: function(){
      this.scoreLabel.text = 'score: ' + this.game.global.score;
    },

    updateScore: function(value){
      this.game.global.score += value;
      this.game.global.levelScore += value;
      this.nextLevel();
    },

    nextLevel: function(){
      if(this.game.global.levelScore >= this.game.global.maxLevelScore){
        this.game.global.levelScore = 0;
        ++this.game.global.currentLevel;
        this.player.kill();
        this.enemies.destroy(false);
        this.game.plugins.levelsManager.levelTransition();
        this.time.events.add(2600, function(){
          this.layer = this.game.plugins.levelsManager.createLevel(true);
          this.player.alpha = 1;
          this.player.reset(this.game.world.centerX, this.game.world.centerY);
          this.createEnemies();
          this.respawnCoin();
        }, this);
      }
    },

    displayLives: function(){
      this.lives = this.game.add.group();
      for (var i = 0; i < this.maxPlayerLives; i++) {
        this.lives.create(420 + 17 * i, 30, 'gameElements', 'live');
      }
    },

    updateLives: function(){
      //remove lives
      this.lives.remove(this.lives.children[this.game.global.playerLives]);
    },

    initSounds: function(){
      this.jumpSound = this.game.add.audio('jump');
      this.coinSound = this.game.add.audio('coin');
      this.deadSound = this.game.add.audio('dead');
      this.enemyKillSound = this.game.add.audio('enemyKill');
      this.jumpSound.volume = 0.1;
      this.coinSound.volume = 0.2;
      this.deadSound.volume = 0.3;
      this.enemyKillSound.volume = 1;
    },

    addControls: function(){
      this.cursor = this.game.input.keyboard.createCursorKeys();
      //prevent to move the game frame by pushing control buttons
      this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.SPACEBAR,
      ]);

      this.altKeys = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
      };
    },

    addMobileControls: function(){
      this.moveLeft = false;
      this.moveRight = false;

      this.jumpButton = this.game.add.sprite(420, 260, 'controlsElements', 'button-jump');
      this.jumpButton.inputEnabled = true;

      this.jumpButton.events.onInputDown.add(this.jumpPlayer, this);

      this.jumpButton.alpha = 0.5;



      this.leftButton = this.game.add.sprite(-20, 260, 'controlsElements', 'button-left');
      this.leftButton.inputEnabled = true;

      this.leftButton.events.onInputOver.add(function(){this.moveLeft = true;}, this);
      this.leftButton.events.onInputOut.add(function(){this.moveLeft = false;}, this);
      this.leftButton.events.onInputDown.add(function(){this.moveLeft = true;}, this);
      this.leftButton.events.onInputUp.add(function(){this.moveLeft = false;}, this);

      this.leftButton.alpha = 0.5;



      this.rightButton = this.game.add.sprite(50, 260, 'controlsElements', 'button-right');
      this.rightButton.inputEnabled = true;

      this.rightButton.events.onInputOver.add(function(){this.moveRight = true;}, this);
      this.rightButton.events.onInputOut.add(function(){this.moveRight = false;}, this);
      this.rightButton.events.onInputDown.add(function(){this.moveRight = true;}, this);
      this.rightButton.events.onInputUp.add(function(){this.moveRight = false;}, this);

      this.rightButton.alpha = 0.5;
    },

    initMobileControls: function(){
      if(!this.game.device.desktop){
        this.addMobileControls();
      }
    },

    addGlobalVars: function(){
      this.game.plugins.screenShake = this.game.plugins.add(Phaser.Plugin.ScreenShake);
      this.game.plugins.levelsManager = this.game.plugins.add(Phaser.Plugin.levelsManager);
      this.game.plugins.levelsManager.setup({
        levels: 5,
        prefix: 'level_',
        collisionMap: {
          '1': [1,2,3],
          '2': [1,2,3],
          '3': [1,2,3],
          '4': [1,2,3],
          '5': [1,2,3]
        }
      });

      this.game.global.score = 0;
      this.game.global.playerLives = 3;
      this.game.global.currentLevel = 1;
      this.game.global.levelScore = 0;
      this.maxPlayerLives = 3;
      this.nextEnemy = 0;
      this.coinPos = [];
    },

    createBackground: function(){
      var bitmap = this.game.add.bitmapData(500, 340);
      var gradient = bitmap.context.createLinearGradient(0, 0, 0, 340);
      gradient.addColorStop(0, '#3498db');
      gradient.addColorStop(0.7, '#5eaadd');
      gradient.addColorStop(1, '#87bbdd');
      bitmap.context.fillStyle = gradient;
      bitmap.context.fillRect(0, 0, 500, 340);
      this.game.add.sprite(0, 0, bitmap);

      this.clouds = [
        this.game.add.sprite(this.game.world.centerX - 200, this.game.world.centerY - 130, 'gameElements', 'cloud-01'),
        this.game.add.sprite(this.game.world.centerX + 70, this.game.world.centerY - 140, 'gameElements', 'cloud-02'),
        this.game.add.sprite(this.game.world.centerX - 70, this.game.world.centerY - 100, 'gameElements', 'cloud-03'),
      ];
      var cloudsCnt = this.clouds.length;

      for(var i = 0; i < cloudsCnt; i++){
        this.clouds[i].alpha = 0.4;
        this.game.physics.arcade.enable(this.clouds[i]);
        this.clouds[i].body.velocity.x = 50 + ((i % 2) ? i*2: i*3);
      }
    },

    resetCloudsPosition: function(){
      var cloudsCnt = this.clouds.length;
      for(var i = 0; i < cloudsCnt; i++){
        if(!this.clouds[i].inWorld){
          this.clouds[i].x = -20;
          this.clouds[i].body.velocity.x = 50 + ((i % 2) ? i*2: i*3);
        }
      }
    }
  };

  window['super-coin-box'] = window['super-coin-box'] || {};
  window['super-coin-box'].gameState = gameState;

})(Phaser);

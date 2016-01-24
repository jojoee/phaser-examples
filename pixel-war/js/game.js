Game = {};
var w = 300;
var h = 500;
var score = 0;

function rand(num) {
  return Math.floor(Math.random() * num)
};

Game.Load = function(game) {
};
Game.Load.prototype = {
  preload: function() {
    game.stage.backgroundColor = '#2980b9';
    label = game.add.text(w / 2, h / 2, 'loading...', {
      font: '30px Arial',
      fill: '#fff'
    });
    label.anchor.setTo(0.5, 0.5);
    game.load.image('bg', 'images/bg.png');
    game.load.image('player', 'images/player.png');
    game.load.image('fire', 'images/fire.png');
    game.load.image('bonus', 'images/bonus.png');
    game.load.image('pixel', 'images/pixel.png');
    game.load.spritesheet('bullet', 'images/bullet.png', 16, 32);
    game.load.image('enemy', 'images/enemy.png');
    game.load.audio('hit', 'sounds/hit.wav');
    game.load.audio('fire', 'sounds/fire.wav');
    game.load.audio('exp', 'sounds/exp.wav');
    game.load.audio('dead', 'sounds/dead.wav');
    game.load.audio('bonus', 'sounds/bonus.wav');
  },
  create: function() {
    game.state.start('Intro');
  }
};

Game.Intro = function(game) {};
Game.Intro.prototype = {
  create: function() {
    game.add.sprite(0, 0, 'bg');
    this.cursor = game.input.keyboard.createCursorKeys();
  },
  update: function() {
    if (this.cursor.up.isDown)
      game.state.start('Play');
  }
};

Game.Play = function(game) {};
Game.Play.prototype = {
  create: function() {
    this.fireTime = 0;
    this.bonusTime = 0;
    this.enemyTime = 0;
    this.bulletTime = 0;
    this.lives = 3;
    this.evolution = 1;
    this.playerY = h - 70;
    score = 0;
    this.cursor = game.input.keyboard.createCursorKeys();
    this.enemies = game.add.group();
    this.enemies.createMultiple(25, 'enemy');
    this.enemies.setAll('outOfBoundsKill', true);
    this.fires = game.add.group();
    this.fires.createMultiple(25, 'fire');
    this.fires.setAll('outOfBoundsKill', true);
    this.bonuses = game.add.group();
    this.bonuses.createMultiple(3, 'bonus');
    this.bonuses.setAll('outOfBoundsKill', true);
    this.bullets = game.add.group();
    this.bullets.createMultiple(25, 'bullet');
    this.bullets.setAll('outOfBoundsKill', true);
    this.player = game.add.sprite(w / 2, this.playerY, 'player');
    this.player.body.collideWorldBounds = true;
    this.hit_s = game.add.audio('hit');
    this.fire_s = game.add.audio('fire');
    this.exp_s = game.add.audio('exp');
    this.bonus_s = game.add.audio('bonus');
    this.emitter = game.add.emitter(0, 0, 200);
    this.emitter.makeParticles('pixel');
    this.emitter.gravity = 0;
    this.livesText = game.add.text(w - 25, 10, this.lives, {
      font: '30px Arial',
      fill: '#fff'
    });
    this.scoreText = game.add.text(10, 10, "0", {
      font: '30px Arial',
      fill: '#fff'
    });
  },
  update: function() {
    this.player.body.velocity.x = 0;
    if (this.cursor.left.isDown)
      this.player.body.velocity.x = -350;
    else if (this.cursor.right.isDown)
      this.player.body.velocity.x = 350;
    if (this.cursor.up.isDown)
      this.fire();
    if (this.game.time.now > this.enemyTime) {
      this.enemyTime = game.time.now + 250;
      var enemy = this.enemies.getFirstExists(false);
      if (enemy) {
        enemy.body.setSize(enemy.width, enemy.height / 2, 0, 0);
        enemy.reset(rand(w / enemy.width - 1) * enemy.width + 7, -enemy.height);
        enemy.body.velocity.y = 300;
      }
    }
    if (this.game.time.now > this.bulletTime) {
      this.bulletTime = game.time.now + 1000 - score / 2;
      var bullet = this.bullets.getFirstExists(false);
      if (bullet) {
        bullet.reset(rand(w - bullet.width), -bullet.height);
        bullet.body.velocity.y = 350;
        bullet.animations.add('move');
        bullet.animations.play('move', 4, true);
      }
    }
    if (this.game.time.now > this.bonusTime) {
      this.bonusTime = game.time.now + 5000;
      var bonus = this.bonuses.getFirstExists(false);
      bonus.reset(rand(w - bonus.width) + bonus.width / 2, -bonus.height / 2);
      bonus.body.velocity.y = 150;
      bonus.anchor.setTo(0.5, 0.5);
      this.game.add.tween(bonus).to({
        angle: 360
      }, 3500, Phaser.Easing.Linear.None).start();
    }
    game.physics.overlap(this.player, this.enemies, this.playerHit, null, this);
    game.physics.overlap(this.fires, this.enemies, this.enemyHit, null, this);
    game.physics.overlap(this.player, this.bonuses, this.takeBonus, null, this);
    game.physics.overlap(this.player, this.bullets, this.playerHit, null, this);
  },
  playerHit: function(player, enemy) {
    this.lives -= 1;
    if (this.lives == 0) {
      this.clear();
      game.state.start('Over');
    }
    enemy.kill();
    this.hit_s.play('', 0, 0.2);
    game.add.tween(player).to({
        y: this.playerY + 20
      }, 100, Phaser.Easing.Linear.None)
      .to({
        y: this.playerY
      }, 100, Phaser.Easing.Linear.None).start();
    this.evolution = 1;
    this.livesText.content = this.lives;
  },
  takeBonus: function(player, bonus) {
    this.bonus_s.play('', 0, 0.1);
    bonus.kill();
    this.evolution += 1;
    this.updateScore(100);
  },
  enemyHit: function(fire, enemy) {
    this.exp_s.play('', 0, 0.1);
    this.emitter.x = enemy.x + enemy.width / 2;
    this.emitter.y = enemy.y + enemy.height / 2;
    fire.kill();
    enemy.kill();
    this.emitter.start(true, 300, null, 10);
    this.updateScore(10);
  },
  fire: function() {
    if (this.game.time.now > this.fireTime) {
      this.fireTime = game.time.now + 300;
      this.fire_s.play('', 0, 0.1);
      if (this.evolution == 1)
        this.oneFire(this.player.x + this.player.width / 2, this.player.y);
      else if (this.evolution == 2) {
        this.oneFire(this.player.x + this.player.width * 1 / 4, this.player.y);
        this.oneFire(this.player.x + this.player.width * 3 / 4, this.player.y);
      } else {
        this.oneFire(this.player.x, this.player.y);
        this.oneFire(this.player.x + this.player.width / 2, this.player.y);
        this.oneFire(this.player.x + this.player.width, this.player.y);
      }
      this.game.add.tween(this.player).to({
          y: this.playerY + 5
        }, 50, Phaser.Easing.Linear.None)
        .to({
          y: this.playerY
        }, 50, Phaser.Easing.Linear.None).start();
    }
  },
  oneFire: function(x, y) {
    var fire = this.fires.getFirstExists(false);
    fire.reset(x - fire.width / 2, y - fire.height);
    fire.body.velocity.y = -500;
  },
  updateScore: function(n) {
    score += n;
    this.scoreText.content = score;
  },
  clear: function() {
    this.lives = 3;
    this.evolution = 1;
  }
};

Game.Over = function(game) {
  this.cursor
};
Game.Over.prototype = {
  create: function() {
    label = game.add.text(w / 2, h / 2, 'game over\n\nscore: ' + score + '\n\npress the UP arrow\nkey to restart', {
      font: '30px Arial',
      fill: '#fff',
      align: 'center'
    });
    label.anchor.setTo(0.5, 0.5);
    this.cursor = game.input.keyboard.createCursorKeys();
    this.time = this.game.time.now + 800;
    game.add.audio('dead').play('', 0, 0.2);
  },
  update: function() {
    if (this.game.time.now > this.time && this.cursor.up.isDown)
      game.state.start('Play');
  }
};

var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');
game.state.add('Load', Game.Load);
game.state.add('Intro', Game.Intro);
game.state.add('Play', Game.Play);
game.state.add('Over', Game.Over);
game.state.start('Load');
